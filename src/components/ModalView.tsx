import { View, Modal, TouchableOpacity, Image, Pressable, Text, Alert, PermissionsAndroid, Platform } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import style from '../style/style';
import Icon from "react-native-vector-icons/FontAwesome6";
import LottieView from 'lottie-react-native';
import context from '../context/context';
import RNFS from 'react-native-fs';

type ModalProps = {
    url: string,
}

const ModalView: React.FC<ModalProps> = ({ url }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const contextValue = useContext(context);

    if (!contextValue) {
        throw new Error("useContext: context value is undefined");
    }
    const { modalVisible, setModalVisible } = contextValue;
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
        Image.getSize(
            url,
            (width, height) => {
                setAspectRatio(width / height);
            },
            (error) => {
                console.error(error);
            }
        );
    }, [url]);

    const requestStoragePermission = async () => {
        try {
            if (Platform.OS === 'android') {
                const rationale = {
                    title: 'Storage Permission Required',
                    message: 'Wallpaper Aesthetic needs access to your storage to download photos.',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel',
                    buttonNeutral: 'Ask Me Later'
                };

                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    rationale
                );

                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
            return true; // Permissions are automatically granted on iOS
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const getFileExtension = (url: string) => {
        return url.substring(url.lastIndexOf('.'));
    };

    const downloadImage = async (url: string) => {
        try {
            setIsDownloading(true);
            const hasPermission = await requestStoragePermission();
            if (!hasPermission) {
                Alert.alert('Permission Denied', 'You need to grant storage permission to download the image');
                setIsDownloading(false);
                return;
            }

            const directoryPath = `${RNFS.ExternalStorageDirectoryPath}/Wallpaper Aesthetic`;
            await RNFS.mkdir(directoryPath); // Create the directory if it doesn't exist

            const fileExtension = getFileExtension(url);
            const uniqueNumber = Date.now();
            const downloadDest = `${directoryPath}/Wallpaper_Aesthetic_${uniqueNumber}${fileExtension}`;

            const options = {
                fromUrl: url,
                toFile: downloadDest,
                background: true,
            };

            const ret = RNFS.downloadFile(options);
            const response = await ret.promise;

            if (response.statusCode === 200) {
                setIsDownloading(false);
                Alert.alert('Success', 'Image downloaded to ' + downloadDest);
            } else {
                setIsDownloading(false);
                Alert.alert('Error', 'Server error');
            }
        } catch (err) {
            setIsDownloading(false);
            Alert.alert('Error', 'Error downloading image: ' );
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }} >
            <View style={style.modal}>
                <View style={{ display: "flex", alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(false);
                        setIsLoading(true);
                    }}>
                        <Icon name='x' size={30} color={"#ffffff"} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    {isLoading ?
                        <LottieView
                            source={require("../util/loader.json")}
                            style={{ width: 150, height: 150 }}
                            autoPlay
                            loop
                        /> : null}
                    <Image
                        source={{ uri: url }}
                        style={{ width: '100%', aspectRatio, height: isLoading ? 0 : "auto" }}
                        resizeMode='contain'
                        onLoadEnd={() => setIsLoading(false)}
                        onLoad={() => setIsLoading(false)}
                    />
                </View>
               {
                !isLoading&&<Pressable style={style.mainBtn} onPress={() => downloadImage(url)} disabled={isDownloading}>
                 {isDownloading ? (
                     <LottieView
                         source={require("../util/loader.json")}
                         style={{ width: 150, height: 30, transform: [{ scale: 7 }], marginLeft: "auto", marginRight: "auto" }}
                         autoPlay
                         loop
                     />
                 ) : (
                     <Text style={style.mainBtnText}>Download Image</Text>
                 )}
             </Pressable>
               }
            </View>
        </Modal>
    );
}

export default ModalView;

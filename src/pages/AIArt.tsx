import { View, ScrollView, TouchableOpacity,NativeSyntheticEvent,NativeScrollEvent,Modal, Text, Alert } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { apiUrl } from '../util/contants'
import style from '../style/style';
import { RootStackParamList } from '../../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import ImageLoader from '../components/ImageLoader';
import ModalView from '../components/ModalView';
import context from '../context/context';
import { ImageData, Item } from '../util/Types';
import MasonryList from '@react-native-seoul/masonry-list';

const AiArt = () => {
  const navigate=useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const[imageData,setImageData]=useState<ImageData[]>([])
  const[pageNum,setPageNum]=useState(3)
  const[atEnd,setAtEnd]=useState(false)
  const [scrollY, setScrollY] = useState(0);
  const [ imageUrl,setImageUrl]=useState("https://w.wallhaven.cc/full/3l/wallhaven-3lepy9.jpg")
  const contextValue = useContext(context);
  const previousScrollY = useRef(0);
  if (!contextValue) {
      throw new Error("useContext: context value is undefined");
  }
  const { setModalVisible,setScrollHeight } = contextValue;
  useEffect(()=>{
    getImages()
  },[])
  async function getImages(){
    if(imageData.length>0){return}
   try{
     const promis = await fetch(apiUrl+`?q=ai&categories=000&purity=110&sorting=relevance&order=desc&ai_art_filter=0`)
    const imagesList = await promis.json()
    setImageData(imagesList.data)
   }catch(e){

   }
  }
  async function getOtherPages(){
    if(atEnd){return}
   try{
    setAtEnd(true)
    setPageNum((prev)=>prev+1)
    
     const promis = await fetch(apiUrl+`?q=ai&categories=000&purity=110&sorting=relevance&order=desc&ai_art_filter=0&page=${pageNum}`)
    const imagesList = await promis.json()
    setImageData((oldData)=>[...oldData,...imagesList.data])
    setAtEnd(false)
   }catch(e){

   }
  }
  // scroll end
    const [isEndReached, setIsEndReached] = useState(false);

  const handleScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

    if (offsetY + scrollViewHeight >= contentHeight - 20) {
      if (!isEndReached) {
        setIsEndReached(true);
        handleEndReached();
      }
    } else {
      if (isEndReached) {
        setIsEndReached(false);
      }
    }
  };

  const handleEndReached = () => {
    getOtherPages()
  }; 
  function scrollPosition(event:NativeSyntheticEvent<NativeScrollEvent>){
    const { nativeEvent } = event;
    setScrollY(nativeEvent.contentOffset.y);
      if(scrollY>previousScrollY.current){
        setScrollHeight(1)
      }else{
        setScrollHeight(0)
      }
    previousScrollY.current=scrollY
  }
  const ListFooter = () => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <LottieView
        source={require("../util/loader.json")}
        style={{ width: 150, height: 150 }}
        autoPlay
        loop
      />
    </View>
  );
  return (
    <View style={{ flex: 7 }}>
    <ModalView url={imageUrl} />
    <MasonryList
      data={imageData}
      keyExtractor={(item: Item) => item.id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, i }) => (
        <TouchableOpacity onPress={() => {
          setImageUrl(item.path);
          setModalVisible(true);
        }}>
          <ImageLoader url={(item as Item).thumbs.original} />
        </TouchableOpacity>
      )}
      ListFooterComponent={<ListFooter/>}
      onEndReachedThreshold={0.1}
      onEndReached={handleEndReached}
      onScroll={scrollPosition}
      scrollEventThrottle={16}
    />
  </View>
  )
}

export default AiArt
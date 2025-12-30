import { View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import style from '../style/style'
import LottieView from 'lottie-react-native'

type Url = {
    url: string
}

const ImageLoader: React.FC<Url> = ({ url }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        Image.getSize(url, (width, height) => {
            setImageDimensions({ width, height })
        }, (error) => {
            console.error(`Couldn't get the image size: ${error.message}`)
        })
    }, [url])

    const aspectRatio = imageDimensions.width / imageDimensions.height
    const dynamicHeight = imageDimensions.width > 0 ? 200 / aspectRatio : 0

    return (
        <View>
            {isLoading && (
                <View style={style.imageLoader}>
                    <LottieView
                        source={require("../util/loader.json")}
                        style={{ width: 150, height: 150 }}
                        autoPlay
                        loop
                    />
                </View>
            )}

            <Image
                source={{ uri: url }}
                style={[style.apiImage, {height: dynamicHeight }]}
                onLoadStart={() => setIsLoading(true)}
                onLoad={() => setIsLoading(false)}
            />
        </View>
    )
}

export default ImageLoader

import { View, Text, Image, Pressable, ScrollView, Animated } from 'react-native';
import React, { useContext, useState, useEffect, useRef } from 'react';
import Wrapper from '../ui/Wrapper';
import style from '../style/style';
import Swiper from 'react-native-swiper';
import RandomArt from '../pages/RandomArt';
import AIArt from '../pages/AIArt';
import Anime from '../pages/Anime';
import People from '../pages/People';
import Sketchy from '../pages/Sketchy';
import context from '../context/context';

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Random Art');
  const contextValue = useContext(context);
  const scrollScale = useRef(new Animated.Value(1)).current; // Initial scale is 1

  if (!contextValue) {
    throw new Error("useContext: context value is undefined");
  }
  const { scrollHeight } = contextValue;

  useEffect(() => {
    Animated.timing(scrollScale, {
      toValue: scrollHeight === 1 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [scrollHeight]);

  const swiperImages = [
    "https://w.wallhaven.cc/full/3l/wallhaven-3led2d.jpg",
    "https://w.wallhaven.cc/full/we/wallhaven-werdv6.png",
    "https://w.wallhaven.cc/full/3l/wallhaven-3lepy9.jpg",
    "https://w.wallhaven.cc/full/3l/wallhaven-3l828y.jpg",
    "https://w.wallhaven.cc/full/gp/wallhaven-gpg5ql.jpg",
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Random Art':
        return <RandomArt />;
      case 'AI Art':
        return <AIArt />;
      case 'Anime Art':
        return <Anime />;
      case 'People':
        return <People />;
      case 'Sketchy':
        return <Sketchy />;
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <Animated.View style={[style.swiperContainer, { height: scrollScale.interpolate({ inputRange: [0, 1], outputRange: [0, 200] }) }]}>
        <Swiper
          activeDotColor='#EE5776'
          dot={<View style={{ backgroundColor: '#ee577680', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 10 }} />}
          height={200}
          autoplay
          loop
          showsButtons={false}
        >
          {swiperImages.map((item, key) => (
            <Image source={{ uri: item }} resizeMode='center' style={style.image} key={key} />
          ))}
        </Swiper>
      </Animated.View>

      <ScrollView horizontal style={{ height: 0 }}>
        <View style={style.tabsGroup}>
          <Pressable style={activeTab === 'Random Art' ? style.activeTabBtn : style.tabBtn} onPress={() => setActiveTab('Random Art')}>
            <Text style={style.tabBtnText}>Random Art</Text>
          </Pressable>
          <Pressable style={activeTab === 'AI Art' ? style.activeTabBtn : style.tabBtn} onPress={() => setActiveTab('AI Art')}>
            <Text style={style.tabBtnText}>AI Art</Text>
          </Pressable>
          <Pressable style={activeTab === 'Anime Art' ? style.activeTabBtn : style.tabBtn} onPress={() => setActiveTab('Anime Art')}>
            <Text style={style.tabBtnText}>Anime Art</Text>
          </Pressable>
          <Pressable style={activeTab === 'People' ? style.activeTabBtn : style.tabBtn} onPress={() => setActiveTab('People')}>
            <Text style={style.tabBtnText}>People</Text>
          </Pressable>
          <Pressable style={activeTab === 'Sketchy' ? style.activeTabBtn : style.tabBtn} onPress={() => setActiveTab('Sketchy')}>
            <Text style={style.tabBtnText}>Sketchy</Text>
          </Pressable>
        </View>
      </ScrollView>

      {renderContent()}
    </Wrapper>
  );
};

export default Layout;

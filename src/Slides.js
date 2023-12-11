import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Text,
  Image,
  Pressable,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {addFav} from './redux/features/product';

const HomeCarousel = ({carouselImages, isFavorite, item}) => {
  const dispatch = useDispatch();
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef();
  let intervalId = null;
  const isMounted = useRef(true);

  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      isMounted.current = false;

      if (Dimensions.removeEventListener && isMounted.current) {
        Dimensions.removeEventListener('change', onChange);
      }
    };
  }, []);

  const onSlideChange = useCallback(() => {
    const newIndex =
      selectedIndex === carouselImages.length - 1 ? 0 : selectedIndex + 1;

    setSelectedIndex(newIndex);

    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: dimension.width * newIndex,
    });
  }, [selectedIndex]);

  const startInterval = useCallback(() => {
    intervalId = setInterval(onSlideChange, 3000);
  }, [onSlideChange]);

  useEffect(() => {
    startInterval();

    return () => {
      clearInterval(intervalId);
    };
  }, [onSlideChange]);

  const onTouchStart = () => {
    clearInterval(intervalId);
  };

  const onTouchEnd = () => {
    startInterval();
  };

  const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  return (
    <View style={{width: dimension.width, backgroundColor: '#F8F9FB'}}>
      <ScrollView
        horizontal
        ref={scrollRef}
        onMomentumScrollEnd={setIndex}
        showsHorizontalScrollIndicator={false}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        pagingEnabled>
        {carouselImages.map((value, key) => (
          <Image
            source={{uri: `${value}`}}
            style={{
              width: dimension?.width,
              height: 200,
              resizeMode: 'contain',
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
        ))}
      </ScrollView>
      <Pressable
        onPress={() => {
          dispatch(addFav(item));
        }}
        style={{
          right: 20,
          flexDirection: 'row',
          top: 10,
          position: 'absolute',
        }}>
        {isFavorite ? (
          <Svg
            style={{backgroundColor: 'white', borderRadius: 10, padding: 20}}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <G id="Iconly/Two-tone/Heart">
              <G id="Heart">
                <G id="Stroke 1">
                  <Path
                    fill="red"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.87187 11.5983C1.79887 8.24832 3.05287 4.41932 6.56987 3.28632C8.41987 2.68932 10.4619 3.04132 11.9999 4.19832C13.4549 3.07332 15.5719 2.69332 17.4199 3.28632C20.9369 4.41932 22.1989 8.24832 21.1269 11.5983C19.4569 16.9083 11.9999 20.9983 11.9999 20.9983C11.9999 20.9983 4.59787 16.9703 2.87187 11.5983Z"
                    stroke="#3E4554"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    fill="red"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.87187 11.5983C1.79887 8.24832 3.05287 4.41932 6.56987 3.28632C8.41987 2.68932 10.4619 3.04132 11.9999 4.19832C13.4549 3.07332 15.5719 2.69332 17.4199 3.28632C20.9369 4.41932 22.1989 8.24832 21.1269 11.5983C19.4569 16.9083 11.9999 20.9983 11.9999 20.9983C11.9999 20.9983 4.59787 16.9703 2.87187 11.5983Z"
                    stroke="black"
                    strokeOpacity={0.2}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </G>
                <G id="Stroke 3" opacity={0.4}>
                  <Path
                    fill="red"
                    d="M16 6.7C17.07 7.046 17.826 8.001 17.917 9.122"
                    stroke="#3E4554"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    fill="red"
                    d="M16 6.7C17.07 7.046 17.826 8.001 17.917 9.122"
                    stroke="black"
                    strokeOpacity={0.2}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </G>
              </G>
            </G>
          </Svg>
        ) : (
          <Svg
            style={{backgroundColor: 'white', borderRadius: 10, padding: 20}}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <G id="Iconly/Two-tone/Heart">
              <G id="Heart">
                <G id="Stroke 1">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.87187 11.5983C1.79887 8.24832 3.05287 4.41932 6.56987 3.28632C8.41987 2.68932 10.4619 3.04132 11.9999 4.19832C13.4549 3.07332 15.5719 2.69332 17.4199 3.28632C20.9369 4.41932 22.1989 8.24832 21.1269 11.5983C19.4569 16.9083 11.9999 20.9983 11.9999 20.9983C11.9999 20.9983 4.59787 16.9703 2.87187 11.5983Z"
                    stroke="#3E4554"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.87187 11.5983C1.79887 8.24832 3.05287 4.41932 6.56987 3.28632C8.41987 2.68932 10.4619 3.04132 11.9999 4.19832C13.4549 3.07332 15.5719 2.69332 17.4199 3.28632C20.9369 4.41932 22.1989 8.24832 21.1269 11.5983C19.4569 16.9083 11.9999 20.9983 11.9999 20.9983C11.9999 20.9983 4.59787 16.9703 2.87187 11.5983Z"
                    stroke="black"
                    strokeOpacity={0.2}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </G>
                <G id="Stroke 3" opacity={0.4}>
                  <Path
                    d="M16 6.7C17.07 7.046 17.826 8.001 17.917 9.122"
                    stroke="#3E4554"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M16 6.7C17.07 7.046 17.826 8.001 17.917 9.122"
                    stroke="black"
                    strokeOpacity={0.2}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </G>
              </G>
            </G>
          </Svg>
        )}
      </Pressable>
      <View
        style={{
          left: 20,
          flexDirection: 'row',
          bottom: 10,
        }}>
        {carouselImages.map((val, key) => (
          <View
            style={
              key === selectedIndex
                ? {
                    width: 19,
                    borderTopWidth: 4,
                    borderRadius: 10,
                    borderColor: '#F9B023',
                  }
                : {
                    width: 19,
                    borderTopWidth: 4,
                    borderRadius: 10,
                    borderColor: '#E4E4E4',
                    gap: 2,
                    marginHorizontal: 3,
                  }
            }
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeCarousel;

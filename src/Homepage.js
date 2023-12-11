import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  ImageBackground,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Svg, {G, Path, Circle} from 'react-native-svg';
import {
  fetchAllProducts,
  addToCart,
  addFav,
  fetchProductById,
} from './redux/features/product';
import Product from './Product';

const Homepage = () => {
  const [tab, setTab] = useState('Home');
  const dispatch = useDispatch();
  const {products, cart, favorites} = useSelector(state => ({
    ...state.products,
  }));

  const isItemFavorited = itemId => {
    return favorites.some(item => item.id === itemId);
  };

  const navigation = useNavigation();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  const screenHeight = Dimensions.get('window').height;
  const data = [{}, {}, {}];
  const addToCartHandler = item => {
    dispatch(addToCart(item));
  };
  const addFavHandler = item => {
    dispatch(addFav(item));
  };
  const productHandler = item => {
    dispatch(fetchProductById(item));
    navigation.navigate('product');
  };

  return (
    <SafeAreaView
      style={{flex: 1, height: screenHeight}}
      edges={['right', 'left', 'top']}>
      <View style={{flex: 1}}>
        <View style={styles.main}>
          <View style={[styles.header]}>
            <Text style={styles.text}>Hey, Rachit</Text>
            <Pressable
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => {
                navigation.navigate('cart');
              }}>
              <Image
                source={require('./Images/bag.png')}
                style={styles.images}
              />
              <View
                style={{
                  top: -2,
                  right: 0,
                  position: 'absolute',
                }}>
                {!!cart?.length ? (
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none">
                    <Circle
                      cx={12}
                      cy={12}
                      r={11}
                      fill="#F9B023"
                      stroke="#FAFBFD"
                      strokeWidth={2}
                    />
                    <Text
                      style={{
                        color: '#FFF',
                        textAlign: 'center',
                        fontFamily: 'Manrope',
                        fontSize: 14,
                        fontStyle: 'normal',
                        fontWeight: '600',
                      }}>
                      {cart.length}
                    </Text>
                  </Svg>
                ) : null}
              </View>
            </Pressable>
          </View>
          <View style={styles.searchBox}>
            <Image
              source={require('./Images/search.png')}
              style={{height: 20, width: 20}}
            />
            <TextInput
              style={styles.input}
              placeholder="Search Products or store"
              placeholderTextColor="#8891A5"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 29,
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Manrope',
                  fontSize: 11,
                  lineHeight: 15.03,
                  fontWeight: '800',
                  color: '#F8F9FB',
                  opacity: 0.5,
                }}>
                DELIVERY TO
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 3,
                }}>
                <Text
                  style={{
                    fontFamily: 'Manrope',
                    fontSize: 14,
                    fontWeight: '500',
                    lineHeight: 19,
                    letterSpacing: 0,
                    color: '#F8F9FB',
                    textAlign: 'left',
                  }}>
                  Green Way 3000, Sylhet
                </Text>
                <Image
                  source={require('./Images/dropdown.png')}
                  style={{height: 6, width: 10.4, marginHorizontal: 5}}
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Manrope',
                  fontSize: 11,
                  lineHeight: 15.03,
                  fontWeight: '800',
                  color: '#F8F9FB',
                  opacity: 0.5,
                }}>
                WITHIN
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 3,
                }}>
                <Text
                  style={{
                    fontFamily: 'Manrope',
                    fontSize: 14,
                    fontWeight: '500',
                    lineHeight: 19,
                    letterSpacing: 0,
                    color: '#F8F9FB',
                    textAlign: 'left',
                  }}>
                  1 Hour
                </Text>
                <Image
                  source={require('./Images/dropdown.png')}
                  style={{height: 6, width: 10.4, marginHorizontal: 5}}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{marginHorizontal: 15}}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: 'row',
            }}>
            {data.map((item, i) => {
              return (
                <View
                  key={i}
                  style={{
                    backgroundColor: 'rgba(249, 176, 35, 1)',
                    width: 269,
                    height: 123,
                    borderRadius: 16,
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    marginVertical: 10,
                    marginHorizontal: 5,
                  }}>
                  <View style={{justifyContent: 'center', flex: 0.5}}>
                    <Image
                      source={require('./Images/outlinedProduct.png')}
                      style={{width: 68, height: 68, opacity: 0.6}}
                    />
                  </View>
                  <View
                    style={{flex: 1, justifyContent: 'center', marginLeft: 40}}>
                    <Text
                      style={{
                        fontFamily: 'Manrope',
                        height: 28.88,
                        width: 34,
                        fontWeight: '300',
                        fontSize: 20,
                        lineHeight: 27.32,
                        color: 'rgba(255, 255, 255, 1)',
                      }}>
                      Get
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Manrope',
                        height: 38.5,
                        width: 114,
                        fontWeight: '800',
                        fontSize: 26,
                        lineHeight: 35.52,
                        color: 'rgba(255, 255, 255, 1)',
                      }}>
                      50% OFF
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Manrope',
                        height: 19.25,
                        width: 96,
                        fontWeight: '300',
                        fontSize: 13,
                        lineHeight: 17.76,
                        color: 'rgba(255, 255, 255, 1)',
                      }}>
                      On first 03 order
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={{marginHorizontal: 15, flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.heading}>Recommended</Text>
          </View>
          <View style={{flex: 1, marginTop: 10}}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  marginBottom: 100,
                }}>
                {products?.products?.map((item, i) => {
                  const isFavorite = isItemFavorited(item.id);

                  return (
                    <View style={styles.boxes} key={i}>
                      <Pressable
                        onPress={() => {
                          addFavHandler(item);
                        }}>
                        <Image
                          source={
                            isFavorite
                              ? require('./Images/filledHeart.png')
                              : require('./Images/outlinedHeart.png')
                          }
                          style={{height: 13.35, width: 14.55}}
                        />
                      </Pressable>
                      <View
                        style={{
                          alignItems: 'center',
                          border: 2,
                          borderColor: 'black',
                        }}>
                        <Pressable
                          onPress={() => {
                            productHandler(item.id);
                          }}
                          style={{
                            width: 88,
                            height: 88,
                            top: 5,
                            border: 2,
                            borderRadius: 10,
                            backgroundColor: '#FFF',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={{uri: `${item.thumbnail}`}}
                            resizeMode="contain"
                            style={{
                              flex: 1,
                              aspectRatio: 1,
                            }}
                          />
                        </Pressable>
                      </View>
                      <View
                        style={{
                          top: 30,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              color: '#1E222B',
                              fontFamily: 'Manrope',
                              fontSize: 14,
                              fontWeight: '800',
                              lineHeight: 20,
                            }}>
                            ${item.price}
                          </Text>
                          <Pressable
                            onPress={() => {
                              addToCartHandler(item);
                            }}
                            style={{
                              backgroundColor: '#2A4BA0',
                              width: 24,
                              height: 24,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 50,
                            }}>
                            <MaterialCommunityIcons
                              name={'plus'}
                              size={20}
                              color={'white'}
                            />
                          </Pressable>
                        </View>

                        <Text
                          style={{
                            color: '#1E222B',
                            fontFamily: 'Manrope',
                            fontSize: 12,
                            fontWeight: '400',
                            lineHeight: 20,
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.tab}>
          {tab == 'Home' ? (
            <Pressable
              style={styles.containers}
              onPress={() => {
                setTab('Home'), navigation.navigate('welcome');
              }}>
              <ImageBackground
                source={require('./Images/tabCircle.png')}
                style={styles.backgroundContainer}
                resizeMode="contain">
                <Image
                  source={require('./Images/home2.png')}
                  style={styles.imageStyle}
                  resizeMode="contain"
                />
              </ImageBackground>
              <View style={styles.overlay} />
            </Pressable>
          ) : (
            <Pressable
              style={{width: 90, alignItems: 'center'}}
              onPress={() => {
                setTab('Home'), navigation.navigate('welcome');
              }}>
              <Image
                source={require('./Images/home.png')}
                style={{height: 24, width: 24}}
              />
              <Text
                style={{
                  fontFamily: 'Manrope',
                  fontSize: 12,
                  fontWeight: '500',
                  lineHeight: 16,
                  letterSpacing: 0,
                  textAlign: 'center',
                  paddingTop: 5,
                }}>
                Home
              </Text>
            </Pressable>
          )}
          <View style={{width: 90, alignItems: 'center'}}>
            <Image
              source={require('./Images/category.png')}
              style={{height: 24, width: 24}}
            />
            <Text
              style={{
                fontFamily: 'Manrope',
                fontSize: 12,
                fontWeight: '500',
                lineHeight: 16,
                letterSpacing: 0,
                textAlign: 'center',
                paddingTop: 5,
              }}>
              Categories
            </Text>
          </View>
          {tab == 'Fav' ? (
            <Pressable
              style={styles.containers}
              onPress={() => {
                setTab('Fav');
                navigation.navigate('fav');
              }}>
              <ImageBackground
                source={require('./Images/tabCircle.png')}
                style={styles.backgroundContainer}
                resizeMode="contain">
                <Image
                  source={require('./Images/heart2.png')}
                  style={styles.imageStyle}
                  resizeMode="contain"
                />
              </ImageBackground>
              <View style={styles.overlay} />
            </Pressable>
          ) : (
            <Pressable
              style={{width: 90, alignItems: 'center'}}
              onPress={() => {
                setTab('Fav'), navigation.navigate('fav');
              }}>
              <Image
                source={require('./Images/fav.png')}
                style={{height: 24, width: 24}}
              />
              <Text
                style={{
                  fontFamily: 'Manrope',
                  fontSize: 12,
                  fontWeight: '500',
                  lineHeight: 16,
                  letterSpacing: 0,
                  textAlign: 'center',
                  paddingTop: 5,
                }}>
                Favourite
              </Text>
            </Pressable>
          )}
          <View style={{width: 90, alignItems: 'center'}}>
            <Image
              source={require('./Images/more.png')}
              style={{height: 24, width: 24}}
            />
            <Text
              style={{
                fontFamily: 'Manrope',
                fontSize: 12,
                fontWeight: '500',
                lineHeight: 16,
                letterSpacing: 0,
                textAlign: 'center',
                paddingTop: 5,
              }}>
              More
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(42, 75, 160, 1)',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  bottomContainer: {
    position: 'absolute',

    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingVertical: 10,
    shadowColor: '#A3A5B8',
    shadowOffset: {
      width: -3,
      height: -5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 50,
    elevation: 8, // For Android elevation
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    height: 68,
    width: 68,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
    marginTop: 45,
  },
  text: {
    marginRight: 10,
    fontFamily: 'Manrope',
    fontSize: 22,
    fontWeight: '600',
    color: '#F8F9FB',
  },
  images: {
    width: 34,
    height: 34,
  },

  container: {
    height: 38,
  },
  heading: {
    fontFamily: 'Manrope',
    fontSize: 30,
    fontWeight: '400',

    letterSpacing: 0,
    textAlign: 'left',
    color: '#1E222B',
  },
  boxes: {
    width: 170,
    height: 194,

    flexDirection: 'column',

    borderRadius: 12,
    backgroundColor: '#f8f9fb',
    padding: 10,
    marginVertical: 10,
  },
  input: {
    color: 'white',
    paddingHorizontal: 20,
    fontSize: 16,
  },
  searchBox: {
    flexDirection: 'row',
    marginTop: 35,
    width: '100%',
    alignItems: 'center',
    height: 56,
    borderRadius: 28,
    paddingLeft: 40,
    backgroundColor: 'rgba(21, 48, 117, 1)',
  },
  containers: {
    width: 90,
    height: 56,
    top: -30,
  },
  backgroundContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Homepage;

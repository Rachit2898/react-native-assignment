import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {G, Path, Circle} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {
  fetchAllProducts,
  addToCart,
  addFav,
  fetchProductById,
} from './redux/features/product';
import {useDispatch, useSelector} from 'react-redux';
import Slider from './Slides';

const Product = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {products, cart, favorites, selectedProduct} = useSelector(state => ({
    ...state.products,
  }));

  const floorValue = Math.floor(selectedProduct?.rating);

  const decimalPart = selectedProduct?.rating - floorValue;

  const addToCartHandler = item => {
    dispatch(addToCart(item));
  };
  const isItemFavorited = itemId => {
    return favorites.some(item => item.id === itemId);
  };
  const isFavorite = isItemFavorited(selectedProduct?.id);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}
      edges={['right', 'left', 'top']}>
      <View style={{flex: 1}}>
        <View
          style={{
            top: 45,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginBottom: 30,
          }}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              backgroundColor: '#F8F9FB',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignContent: 'center',

              borderRadius: 50,
            }}>
            <Image
              style={{alignContent: 'center', alignSelf: 'center'}}
              source={require('./Images/back.png')}
            />
          </Pressable>
          <Pressable
            style={{
              alignSelf: 'center',

              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('cart')}>
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Svg
                width={18}
                height={20}
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M13.4485 5.9995C10.2931 6.51124 7.63269 6.49623 4.56871 5.99535C2.47793 5.65356 0.597986 7.484 1.09451 9.53958L2.86182 16.8562C3.16559 18.1138 4.29303 19 5.58921 19H12.4423C13.7385 19 14.8659 18.1138 15.1697 16.8562L16.9336 9.55363C17.4309 7.49478 15.5431 5.65982 13.4485 5.9995Z"
                  stroke="#1E222B"
                  strokeWidth={1.5}
                />
                <Path
                  d="M5 8.83231L5.00001 4.49999C5.00001 2.567 6.56701 1 8.50001 1H9.5C11.433 1 13 2.567 13 4.5V9"
                  stroke="#1E222B"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
              </Svg>
            </View>

            <View style={{width: 24, height: 24}}>
              {!!cart?.length ? (
                <Svg
                  style={{top: -45, right: 2}}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text>
              <Text style={styles.thin}>Thin Choise</Text>
              <Text style={styles.orange}> Top Orange</Text>
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 181.65,
                height: 20,
                marginTop: 20,
                left: 26,
                gap: 5,
                flexDirection: 'row',
              }}>
              {Array.from({length: floorValue}).map((_, index) => (
                <Svg
                  width={17}
                  height={18}
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M12.6402 10.6367C12.4575 10.8137 12.3736 11.0698 12.4152 11.3209L13.0423 14.7916C13.0952 15.0858 12.9711 15.3835 12.7249 15.5535C12.4836 15.7298 12.1627 15.751 11.8995 15.6099L8.77521 13.9804C8.66657 13.9225 8.54594 13.8915 8.4225 13.888H8.23132C8.16501 13.8979 8.10012 13.919 8.04086 13.9515L4.91582 15.5888C4.76133 15.6664 4.58639 15.6939 4.41497 15.6664C3.99736 15.5874 3.71871 15.1895 3.78714 14.7698L4.41497 11.2991C4.45659 11.0458 4.37264 10.7883 4.18994 10.6085L1.64264 8.13946C1.4296 7.93277 1.35553 7.62238 1.45288 7.34233C1.54741 7.06298 1.78867 6.85911 2.08001 6.81326L5.58598 6.30465C5.85263 6.27714 6.08683 6.11489 6.20675 5.87504L7.75163 2.70768C7.78832 2.63714 7.83558 2.57224 7.89272 2.51721L7.95621 2.46783C7.98936 2.43115 8.02746 2.40082 8.06978 2.37613L8.14667 2.34791L8.2666 2.29853H8.56358C8.82882 2.32604 9.06232 2.48476 9.18436 2.72179L10.7497 5.87504C10.8626 6.10572 11.082 6.26585 11.3352 6.30465L14.8412 6.81326C15.1374 6.85559 15.3851 7.06016 15.4831 7.34233C15.5755 7.62521 15.4958 7.93559 15.2785 8.13946L12.6402 10.6367Z"
                    fill="#F9B023"
                  />
                </Svg>
              ))}
              {decimalPart > 0.5 ? (
                <Svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M9.87444 2.73129L11.4451 5.88756C11.5608 6.11624 11.7816 6.27504 12.0363 6.31033L15.5642 6.82414C15.7703 6.85308 15.9572 6.96177 16.0835 7.12763C16.2084 7.29137 16.262 7.49887 16.2317 7.70284C16.207 7.87223 16.1273 8.02891 16.0052 8.1489L13.4489 10.6269C13.2619 10.7998 13.1773 11.056 13.2224 11.3066L13.8518 14.7903C13.9188 15.211 13.6401 15.6076 13.2224 15.6874C13.0503 15.7149 12.8739 15.686 12.7186 15.6069L9.57175 13.9674C9.3382 13.8495 9.06232 13.8495 8.82878 13.9674L5.6819 15.6069C5.29524 15.8123 4.81616 15.6726 4.60095 15.2914C4.52122 15.1397 4.493 14.9668 4.51911 14.7981L5.14848 11.3136C5.19364 11.0638 5.10826 10.8062 4.92199 10.6333L2.36568 8.15666C2.06158 7.86305 2.05241 7.37959 2.34522 7.0754C2.35157 7.06905 2.35863 7.06199 2.36568 7.05493C2.48704 6.93142 2.6465 6.85308 2.81866 6.83261L6.34655 6.31809C6.60056 6.2821 6.82141 6.12471 6.93783 5.89462L8.452 2.73129C8.58676 2.46027 8.86617 2.29159 9.16957 2.29864H9.26412C9.5273 2.3304 9.75661 2.49344 9.87444 2.73129Z"
                    fill="#1E222B"
                  />
                  <Path
                    d="M9.1801 13.8795C9.04346 13.8837 8.91034 13.9204 8.7906 13.9861L5.65911 15.6219C5.27595 15.8048 4.81743 15.6629 4.6026 15.2965C4.52301 15.1468 4.49413 14.9752 4.5209 14.8072L5.14635 11.3301C5.18861 11.0774 5.10409 10.8204 4.92026 10.6425L2.36281 8.1665C2.05924 7.86928 2.0536 7.38143 2.35083 7.07714C2.35506 7.0729 2.35858 7.06937 2.36281 7.06584C2.48395 6.94582 2.64031 6.86675 2.80865 6.84204L6.3395 6.32242C6.59518 6.28994 6.81704 6.13038 6.92974 5.89882L8.46449 2.69567C8.61029 2.43727 8.88991 2.28336 9.18573 2.2996C9.1801 2.50928 9.1801 13.7369 9.1801 13.8795Z"
                    fill="#F9B023"
                  />
                </Svg>
              ) : null}
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Manrope',
                    fontSize: 14,
                    fontWeight: '400',

                    letterSpacing: 0,
                    textAlign: 'center',
                    color: '#A1A1AB',
                  }}>
                  110 Reviews
                </Text>
              </View>
            </View>
          </View>
          {!!selectedProduct ? (
            <View style={{height: 207, marginTop: 20}}>
              <Slider
                carouselImages={selectedProduct?.images}
                isFavorite={isFavorite}
                item={selectedProduct}
              />
            </View>
          ) : null}

          <View style={{flexDirection: 'row', margin: 20}}>
            <Text
              style={{
                color: '#2A4BA0',
                textAlign: 'center',

                fontFamily: 'Manrope',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: 24,
              }}>
              ${selectedProduct?.price}
            </Text>
            {/* <Text
            style={{
              color: '#2A4BA0',
              textAlign: 'center',
              fontFamily: 'Manrope',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: 24,
            }}>
            /KG
          </Text> */}
            <View
              style={{
                backgroundColor: '#2A4BA0',
                height: 24,
                justifyContent: 'center',
                marginHorizontal: 14,
                borderRadius: 70,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontFamily: 'Manrope',
                  fontSize: 12,
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 16,
                  paddingHorizontal: 10,
                }}>
                $
                {(
                  (selectedProduct?.price *
                    selectedProduct?.discountPercentage) /
                  100
                ).toFixed(2)}{' '}
                OFF
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <View>
              <Pressable
                onPress={() => {
                  addToCartHandler(selectedProduct);
                }}
                style={{
                  width: 143,
                  height: 56,
                  left: 5,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#2A4BA0',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Manrope',
                    fontSize: 14,
                    fontWeight: '600',
                    lineHeight: 19,
                    textAlign: 'center',
                    color: '#2A4BA0',
                  }}>
                  Add to cart
                </Text>
              </Pressable>
            </View>
            <View>
              <Pressable
                onPress={() => {
                  navigation.navigate('check');
                }}
                style={{
                  width: 169,
                  height: 56,
                  left: 5,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#2A4BA0',
                  justifyContent: 'center',
                  backgroundColor: '#2A4BA0',
                }}>
                <Text
                  style={{
                    fontFamily: 'Manrope',
                    fontSize: 14,
                    fontWeight: '600',
                    lineHeight: 19,
                    textAlign: 'center',
                    color: '#FFFFFF',
                  }}>
                  Buy Now
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              height: 102,
              margin: 20,
            }}>
            <View>
              <Text
                style={{
                  color: '#1E222B',

                  fontFamily: 'Manrope',
                  fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 24,
                }}>
                Details
              </Text>
              <Text
                style={{
                  color: '#8891A5',

                  fontFamily: 'Manrope',
                  fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 24,
                }}>
                {selectedProduct?.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Product;

const styles = StyleSheet.create({
  image: {
    height: 34,
    width: 34,
  },
  container: {
    width: 306,
    height: 126,

    left: 20,
  },
  thin: {
    fontFamily: 'Manrope',
    fontSize: 50,
    fontWeight: '300',
    lineHeight: 63,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#1E222B',
  },

  orange: {
    fontFamily: 'Manrope',
    fontSize: 50,
    fontWeight: '800',
    lineHeight: 63,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#1E222B',
  },
});

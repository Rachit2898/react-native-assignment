import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {G, Path} from 'react-native-svg';
import {setToCart} from '../src/redux/features/product';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {products, cart, favorites, selectedProduct} = useSelector(state => ({
    ...state.products,
  }));
  const [carts, setCart] = useState(cart);
  const totalValue = carts.reduce((total, product) => {
    return total + product.price * product.count;
  }, 0);

  const updateQuantity = (index, newCount) => {
    const updatedCart = [...carts];
    updatedCart[index] = {...updatedCart[index], count: newCount};
    setCart(updatedCart);
  };

  const editHandler = () => {
    dispatch(setToCart(carts));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: 40,
          marginTop: 45,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
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
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              fontFamily: 'Manrope',
              fontSize: 16,
              fontWeight: '400',
              textAlign: 'center',
              color: '#1E222B',
            }}>
            Shopping Cart ({cart.length})
          </Text>
        </View>
      </View>
      {cart.length > 0 ? (
        <ScrollView
          style={{marginHorizontal: 20}}
          showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 45}}>
            {carts.map((item, index) => {
              return (
                <View key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: `${item.thumbnail}`}}
                      resizeMode="contain"
                      style={{
                        width: 55,
                        height: 55,
                        borderRadius: 10,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      <View style={{marginLeft: 20}}>
                        <Text
                          style={{
                            fontFamily: 'Manrope',
                            fontSize: 14,
                            fontWeight: '500',
                            lineHeight: 19,
                            color: '#1E222B',
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Manrope',
                            marginTop: 5,
                            fontSize: 14,
                            fontWeight: '400',

                            color: '#1E222B',
                          }}>
                          ${item.price}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: 110,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Pressable
                          onPress={() => {
                            {
                              item.count > 0
                                ? updateQuantity(index, item.count - 1)
                                : null;
                            }
                          }}
                          style={{
                            width: 40,
                            height: 40,
                            backgroundColor: '#F8F9FB',
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <Path
                              d="M15.6666 11.9905H8.33325"
                              stroke="#130F26"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </Svg>
                        </Pressable>
                        <Text
                          style={{
                            fontFamily: 'Manrope',
                            fontSize: 14,
                            fontWeight: '500',

                            color: '#1E222B',
                            alignSelf: 'center',
                          }}>
                          {item.count}
                        </Text>
                        <Pressable
                          onPress={() => {
                            updateQuantity(index, item.count + 1);
                          }}
                          style={{
                            width: 40,
                            height: 40,
                            backgroundColor: '#F8F9FB',
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <Path
                              d="M12.0001 8.3273V15.6537"
                              stroke="#130F26"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <Path
                              d="M15.6666 11.9905H8.33325"
                              stroke="#130F26"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </Svg>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderTopWidth: 0.5,
                      borderColor: '#EBEBFB',
                      flex: 1,
                      marginVertical: 15,
                    }}
                  />
                </View>
              );
            })}
          </View>
          <Pressable
            onPress={() => {
              editHandler();
            }}>
            <Text
              style={{
                fontFamily: 'Manrope',
                fontSize: 16,
                fontWeight: '500',
                lineHeight: 16,
                color: '#2A4BA0',
                alignSelf: 'flex-end',
              }}>
              Edit
            </Text>
          </Pressable>
          <View
            style={{
              backgroundColor: '#F8F9FB',
              borderRadius: 30,
              marginTop: 40,
            }}>
            <View style={{marginVertical: 30}}>
              <View style={{marginHorizontal: 40}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Manrope',
                      fontSize: 14,
                      fontWeight: '400',
                      lineHeight: 20,
                      color: '#616A7D',
                    }}>
                    Subtotal
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Manrope',
                      fontSize: 14,
                      fontWeight: '500',
                      lineHeight: 20,
                      color: '#1E222B',
                      width: 60,
                    }}>
                    ${totalValue}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Manrope',
                      fontSize: 14,
                      fontWeight: '400',
                      lineHeight: 20,
                      color: '#616A7D',
                    }}>
                    Delivery
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Manrope',
                      fontSize: 14,
                      fontWeight: '500',
                      lineHeight: 20,
                      color: '#1E222B',
                      width: 60,
                    }}>
                    $2.00
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Manrope',
                      fontSize: 14,
                      fontWeight: '400',
                      lineHeight: 20,
                      color: '#616A7D',
                    }}>
                    Total
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Manrope',
                      fontSize: 14,
                      fontWeight: '700',
                      lineHeight: 20,
                      color: '#1E222B',
                      width: 60,
                    }}>
                    ${totalValue + 2}
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => {
                  navigation.navigate('check');
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#2A4BA0',
                  height: 56,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 30,
                  marginHorizontal: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Manrope',
                    fontSize: 14,
                    fontWeight: '600',
                    lineHight: 19,
                    color: '#FFFFFF',
                    textAlign: 'center',
                  }}>
                  Proceed To Checkout
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#2A4BA0',
            height: 56,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              fontFamily: 'Manrope',
              fontSize: 14,
              fontWeight: '800',
              lineHight: 19,
              color: '#FFFFFF',
              textAlign: 'center',
            }}>
            Cart is Empty!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});

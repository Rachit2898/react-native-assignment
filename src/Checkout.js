import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setToCart} from '../src/redux/features/product';

const Checkout = () => {
  const messageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateMessages();
  }, []);

  const animateMessages = () => {
    Animated.timing(messageOpacity, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const doneHandler = () => {
    dispatch(setToCart([]));
    navigation.navigate('welcome');
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.messageContainer, {opacity: messageOpacity}]}>
        <Text style={styles.successMessage}>
          You have ordered successfully!
        </Text>
      </Animated.View>
      <Animated.View
        style={[styles.messageContainer, {opacity: messageOpacity}]}>
        <Text style={styles.thanksMessage}>Thanks for ordering!</Text>
      </Animated.View>
      <Animated.View
        style={[styles.flowerAnimation, {opacity: messageOpacity}]}>
        <Text style={styles.congratsMessage}>🌼🌺 Congratulations! 🌺🌼</Text>
      </Animated.View>
      <Pressable
        onPress={() => {
          doneHandler();
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#2A4BA0',
          height: 56,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,

          width: '100%',
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
          Done
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    marginTop: 120,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E222B',
    fontFamily: 'Manrope',
  },
  thanksMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#153075',
    fontFamily: 'Manrope',
  },
  flowerAnimation: {
    alignItems: 'center',
  },
  congratsMessage: {
    fontSize: 20,
    color: '#2A4BA0',
    fontFamily: 'Manrope',
  },
});

export default Checkout;

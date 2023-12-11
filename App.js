import React from 'react';
import Homepage from './src/Homepage';
import Product from './src/Product';
import store from './src/redux/store';
import Favorites from './src/Favorites';
import Checkout from './src/Checkout';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Cart from './src/Cart';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

const Stack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName={'welcome'}
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="welcome"
          component={Homepage}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="product"
          component={Product}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="cart"
          component={Cart}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="fav"
          component={Favorites}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="check"
          component={Checkout}
        />
      </Stack.Navigator>
    </>
  );
};

function App() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar />
          <Stack />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;

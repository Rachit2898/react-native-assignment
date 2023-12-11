import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const FavoritesScreen = () => {
  const {products, cart, favorites, selectedProduct} = useSelector(state => ({
    ...state.products,
  }));
  const navigation = useNavigation();

  const renderFavorites = () => {
    return favorites.map(item => (
      <View>
        <View
          key={item.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 88,
              height: 88,

              border: 2,
              borderRadius: 10,
              backgroundColor: '#FFF',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={{uri: `${item.thumbnail}`}}
              style={{flex: 1, aspectRatio: 1}}
            />
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#1E222B'}}>
              {item.title}
            </Text>
            <Text style={{fontSize: 16, color: '#1E222B'}}>${item.price}</Text>
          </View>

          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              fill="#FF8181"
              d="M7.2752 13.35L6.2203 12.3897C2.47357 8.99215 0 6.75139 0 4.00136C0 1.7606 1.7606 0 4.00136 0C5.26725 0 6.48221 0.589292 7.2752 1.52052C8.0682 0.589292 9.28316 0 10.549 0C12.7898 0 14.5504 1.7606 14.5504 4.00136C14.5504 6.75139 12.0768 8.99215 8.33011 12.3969L7.2752 13.35Z"
            />
          </Svg>
        </View>
        <View
          style={{
            borderTopWidth: 0.5,
            borderColor: '#EBEBFB',
            flex: 1,
            marginVertical: 10,
          }}
        />
      </View>
    ));
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fafafa'}}>
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
          margin: 10,
          borderRadius: 50,
        }}>
        <Image
          style={{alignContent: 'center', alignSelf: 'center'}}
          source={require('./Images/back.png')}
        />
      </Pressable>

      {favorites.length > 0 ? (
        <View style={{padding: 20}}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 20,
              color: '#1E222B',
            }}>
            Favorites ({favorites.length})
          </Text>

          {renderFavorites()}
        </View>
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
            No product is added to the favorites
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default FavoritesScreen;

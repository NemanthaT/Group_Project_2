import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { productStyles } from '../../assets/styles/productstyles';

const Product = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const product = {
    name: 'Very nice asa hithena smart jewelry',
    price: 'Rs. 2000',
    image: require('../../assets/images/jewelry-sample.png'),
    };

  return (
    <ScrollView style={productStyles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <LinearGradient colors={['#9333EA', '#2622A8']} style={productStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={productStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Image source={require('../../assets/images/logo.png')} style={productStyles.logo} resizeMode="contain" />
      </LinearGradient>

      {/* Product Info */}
      <View style={productStyles.detailsContainer}>
        <Text style={productStyles.title}>{product.name}</Text>

        {/* Product Image */}
        <Image source={product.image} style={productStyles.productImage} resizeMode="contain" />

        <Text style={productStyles.description}>
          Stay connected and on track with this sleek smartwatch. Featuring fitness tracking, heart rate monitoring,
          message alerts, and long battery life — it’s the perfect companion for your active lifestyle.
        </Text>
        <Text style={productStyles.price}>{product.price}</Text>

        {/* Action Buttons */}
        <View style={productStyles.buttonRow}>
          <TouchableOpacity style={productStyles.buyNowButton}>
            <Text style={productStyles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={productStyles.addToCartButton}>
            <Text style={productStyles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={productStyles.wishlistButton}>
            <Ionicons name="heart-outline" size={24} color="#2622A8" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Product;

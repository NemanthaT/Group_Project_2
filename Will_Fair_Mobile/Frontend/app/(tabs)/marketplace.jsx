import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { homeStyles } from '../../assets/styles/marketplacestyles';

const categories = [
  { id: 1, name: 'Textiles', image: require('../../assets/images/textiles.png') },
  { id: 2, name: 'Handicraft', image: require('../../assets/images/handicraft.png') },
  { id: 3, name: 'Jewelry', image: require('../../assets/images/jewelry.png') },
  { id: 4, name: 'Home Decor', image: require('../../assets/images/homedecor.png') },
];

const products = Array(5).fill({
  id: Math.random(),
  name: 'Very Nice Beautiful Asa Hithena Smart Jewelry',
  price: 'Rs. 2000',
  image: require('../../assets/images/jewelry-sample.png')
});

const Marketplace = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={homeStyles.container} showsVerticalScrollIndicator={false}>

      {/* Hero Search Bar */}
      <LinearGradient colors={["#7B61FF", "#9333EA"]} style={homeStyles.hero}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ position: 'absolute', top: 10, left: 10 }}>
          <Ionicons name="menu-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={homeStyles.heroTitle}>What Are You Looking For?</Text>
        <View style={homeStyles.searchBar}>
          <TextInput
            placeholder="Search products..."
            style={homeStyles.searchInput}
            placeholderTextColor="#999"
          />
          <Ionicons name="search-outline" size={24} color="#999" />
        </View>
      </LinearGradient>

      {/* Categories */}
      <Text style={homeStyles.sectionTitle}>Browse By Category</Text>
      <View style={homeStyles.categoryGrid}>
        {categories.map((item) => (
          <TouchableOpacity key={item.id} style={homeStyles.categoryItem}>
            <Image source={item.image} style={homeStyles.categoryImage} />
            <Text style={homeStyles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Products */}
      <Text style={homeStyles.sectionTitle}>Recent Products</Text>
      {products.map((item, index) => (
        <View key={index} style={homeStyles.productCard}>
          <Image source={item.image} style={homeStyles.productImage} />
          <View style={homeStyles.productInfo}>
            <Text style={homeStyles.productTitle}>{item.name}</Text>
            <Text style={homeStyles.productPrice}>{item.price}</Text>
            <View style={homeStyles.productButtons}>
              <TouchableOpacity style={homeStyles.buyNow}><Text style={homeStyles.buyNowText}>Buy Now</Text></TouchableOpacity>
              <TouchableOpacity style={homeStyles.addToCart}><Text style={homeStyles.cartText}>Add to Cart</Text></TouchableOpacity>
              <Ionicons name="heart-outline" size={20} color="gray" />
            </View>
          </View>
        </View>
      ))}

      {/* Artisan Stories */}
      <View style={homeStyles.storySection}>
        <Text style={homeStyles.sectionTitle}>Artisan Stories</Text>
            <LinearGradient 
              colors = {['#9333EA', '#2622A8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={homeStyles.storyContainer}>
                <View style={homeStyles.storyCard}><Text>Artisan - Handicraft</Text></View>
                <View style={homeStyles.storyCard}><Text>Artisan - Textiles</Text></View>
            </LinearGradient>
      </View>

      {/* How it Works */}
      <Text style={homeStyles.sectionTitle}>How it Works</Text>
      <View style={homeStyles.infoBox}><Ionicons name="cart-outline" size={24} color="#9333EA" />
        <Text style={homeStyles.infoValue}>Shop Products</Text>
        <Text style={homeStyles.infoDescription}>Browse and purchase unique handcrafted products made by artisans with disabilities</Text>
      </View>
      <View style={homeStyles.infoBox}><Ionicons name="rocket-outline" size={24} color="#9333EA" />
        <Text style={homeStyles.infoValue}>Fast Delivery</Text>
        <Text style={homeStyles.infoDescription}>We deliver your purchases directly to your doorstep anywhere in Sri Lanka</Text>
      </View>
      <View style={homeStyles.infoBox}><Ionicons name="heart-outline" size={24} color="#9333EA" />
        <Text style={homeStyles.infoValue}>Support Artisans</Text>
        <Text style={homeStyles.infoDescription}>your purchase directly supports artisans with disabilities, helping them achieve financial independence</Text>
      </View>

      {/* Our Impact */}
      <Text style={homeStyles.sectionTitle}>Our Impact</Text>
      <View style={homeStyles.infoBox}><Text style={homeStyles.impactValue}>10+</Text><Text style={homeStyles.infoDescription}>Products Available</Text></View>
      <View style={homeStyles.infoBox}><Text style={homeStyles.impactValue}>Rs.17,900+</Text><Text style={homeStyles.infoDescription}>Income Generated</Text></View>
      <View style={homeStyles.infoBox}><Text style={homeStyles.impactValue}>100%</Text><Text style={homeStyles.infoDescription}>Fair Trade</Text></View>
    </ScrollView>
  );
};

export default Marketplace;

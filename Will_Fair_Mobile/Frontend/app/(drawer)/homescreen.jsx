import React, { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { homeStyles } from "../../assets/styles/homestyles"; 
import { Ionicons } from "@expo/vector-icons";
import { Image } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';



const HomeScreen = () => {
    // const scrollViewRef = useRef(null);
    // const aboutRef = useRef(null);
    // const contactRef = useRef(null);

    // const { scrollTo } = useLocalSearchParams();

    // const [aboutY, setAboutY] = useState(0);
    // const [contactY, setContactY] = useState(0);

    // useEffect(() => {
    //   if (scrollTo === 'about' && scrollViewRef.current) {
    //     scrollViewRef.current.scrollTo({ y: aboutY, animated: true });
    //   }
    //   if (scrollTo === 'contact' && scrollViewRef.current) {
    //     scrollViewRef.current.scrollTo({ y: contactY, animated: true });
    //   }
    // }, [scrollTo, aboutY, contactY]);


    const navigation = useNavigation(); // ← Hook for drawer access

    const programs = [
    {
        id: 1,
        title: 'Child Care Renovation',
        target: '$50,000',
        raised: '$5,000',
        progress: '40%',
        image: require('../../assets/images/program1.png'),
    },
    {
        id: 2,
        title: 'Elderly Care Support',
        target: '$10,000',
        raised: '$5,000',
        progress: '70%',
        image: require('../../assets/images/program2.png'),
    },
    {
        id: 3,
        title: 'Medical Aid',
        target: '$18,000',
        raised: '$5,000',
        progress: '55%',
        image: require('../../assets/images/program3.png'),
    },
    ];


  return (
    
      <ScrollView style={[homeStyles.container, { backgroundColor: '#f5f5f5' }]} showsVerticalScrollIndicator={false}>

        {/* Hero Section */}
        <View style={[homeStyles.hero, { backgroundColor: '#5d40efff' }]}>
        <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 5,
            }}
          >
            <Ionicons name="menu-outline" size={30} color="#fff" />
          </TouchableOpacity>
          
          <Text style={[homeStyles.heroTitle, { marginTop: 50 }]}>
            Empowering Generosity, One Gift at a Time
          </Text>

          <Text style={[homeStyles.heroSubtitle, { marginTop: 10 }]}>
            Whether it’s food, education, healthcare, or emergency relief — your
            contribution matters.
          </Text>
          <View style={[homeStyles.heroButtons, { marginTop: 10 }]}>
            <TouchableOpacity style={[homeStyles.ctaButton, { backgroundColor: '#5d40efff', borderColor: '#fff', borderWidth: 2 }]}>
              <Text style={[homeStyles.ctaText, { color: '#fff' }]}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[homeStyles.donateButton, { backgroundColor: '#fff' }]}>
              <Text style={[homeStyles.buttonText, { color: '#5d40efff' }]}>Donate Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Programs */}
        <Text style={homeStyles.sectionTitle}>Featured Programs</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={homeStyles.cardRow}>
         {programs.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={homeStyles.programCard}
          onPress={() => navigation.navigate('requestview_ind', {
            programId: item.id,
            programTitle: item.title,
            programTarget: item.target,
            programRaised: item.raised,
            programProgress: item.progress,
            programImage: item.image
          })}
          activeOpacity={0.8}
    >
            
            {/* Image */}
            <Image
                source={item.image}
                style={homeStyles.programImage}
                resizeMode="cover"
            />

            <Text style={homeStyles.programTitle}>{item.title}</Text>
            <Text style={homeStyles.programGoal}>Raised: {item.raised}</Text>
            <Text style={homeStyles.programGoal}>Target: {item.target}</Text>

            <View style={homeStyles.progressBarContainer}>
                <View style={[homeStyles.progressBarFill, { width: item.progress }]} />
            </View>
          </TouchableOpacity>
        ))}
</ScrollView>

        {/* Testimonial Section */}
        <View style={[homeStyles.testimonialContainer, { backgroundColor: '#ffffff' }]}>
          <Text style={homeStyles.sectionTitle}>What they say about us</Text>
          <Text style={homeStyles.testimonialText}>
            “Welfair made giving back so simple and transparent. I know exactly
            where my money goes.” – Happy Giver
          </Text>
        </View>

        {/* Contact Form */}
        <View style={homeStyles.contactContainer}>
          <Text style={homeStyles.sectionTitle}>Are you willing to make a DIFFERENCE?</Text>
          <TextInput placeholder="Full Name" style={homeStyles.inputField} />
          <TextInput placeholder="Email" style={homeStyles.inputField} />
          <TextInput placeholder="Contact No" style={homeStyles.inputField} />
          <TextInput
            placeholder="Description"
            style={[homeStyles.inputField, { height: 80 }]}
            multiline
          />
          <TouchableOpacity style={[homeStyles.donateButton, { backgroundColor: '#7B61FF' }]}>
            <Text style={[homeStyles.buttonText, { color: '#fff' }]}>Submit</Text>
          </TouchableOpacity>
        </View>

     {/* Contact Us */}
      {/* <View ref={contactRef} onLayout={(event) => setContactY(event.nativeEvent.layout.y)} style={homeStyles.testimonialContainer}> */}
      <View style={[homeStyles.testimonialContainer, { backgroundColor: '#ffffff' }]}>
        <Text style={homeStyles.sectionTitle}>Contact Us</Text>
        <Text style={homeStyles.impactLabel}>Feel free to reach out to us:</Text>

        <View style={homeStyles.contactRow}>
          <Ionicons name="call-outline" size={20} color="#7B61FF" style={homeStyles.icon} />
          <Text style={homeStyles.contactInfo}>+94 77 123456789</Text>
        </View>

        <View style={homeStyles.contactRow}>
          <Ionicons name="mail-outline" size={20} color="#7B61FF" style={homeStyles.icon} />
          <Text style={homeStyles.contactInfo}>info@willfair.org</Text>
        </View>

        <View style={homeStyles.contactRow}>
          <Ionicons name="location-outline" size={20} color="#7B61FF" style={homeStyles.icon} />
          <Text style={homeStyles.contactInfo}>Reid Avenue, Colombo</Text>
        </View>
      </View>



        {/* About Section */}
        {/* <View ref={aboutRef} onLayout={(event) => setAboutY(event.nativeEvent.layout.y)} style={homeStyles.aboutContainer}> */}
        <View style={[homeStyles.aboutContainer, { backgroundColor: '#ffffff', marginBottom: 100 }]}>
          <Text style={homeStyles.sectionTitle}>About</Text>
                <Image
                  source={require('../../assets/images/about.png')}
                      style={homeStyles.imageofabout}
                      resizeMode="contain"
                />
          <Text style={homeStyles.aboutText}>
            This donation platform is dedicated to making giving simple,
            meaningful, and impactful...
          </Text>
        </View>
      </ScrollView>
  );
};

export default HomeScreen;
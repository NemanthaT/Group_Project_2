import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const productStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: { alignItems: "center", padding: 20, borderRadius: 10 },


    sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginVertical: 10,
    color: "#333",
  },

  headerTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#EEDCFF",
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
  },

    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 40,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: width,
        height: 300,
        marginTop: 20,
        marginBottom: 30,
        alignSelf: 'center',
    },
    detailsContainer: {
        padding: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: '600',
        color: '#111',
        marginBottom: 10,
    },
    description: {
    marginVertical: 12,
    color: "#555",
    fontSize: 16,
    lineHeight: 20,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
        marginTop: 5,
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    buyNowButton: {
        backgroundColor: '#2622A8',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
    },
    buyNowText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    wishlistButton: {
        width: 50,
        height: 50,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartButton: {
        backgroundColor: 'rgba(234, 234, 255, 0.5)',
        borderWidth: 2,
        borderColor: '#2622A8',
        paddingVertical: 10,
        borderRadius: 25,
        flex: 1,
    },
    addToCartText: {
        color: '#2622A8',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

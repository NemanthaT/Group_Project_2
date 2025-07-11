import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const productStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    logo: {
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 40,
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
        fontSize: 18,
        color: '#555',
        marginBottom: 20,
        lineHeight: 22,
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#111',
        marginTop: 20,
        marginBottom: 50,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
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

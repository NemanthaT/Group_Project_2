import { StyleSheet } from 'react-native';

export const donationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  mainImage: {
    width: '90%',
    height: 200,
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: 15,
  },
  progressBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E7FF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#1D4ED8',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 14,
    color: '#111',
    marginBottom: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
  activePill: {
    backgroundColor: '#1D4ED8',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#4F46E5',
  },
  tabText: {
    fontSize: 16,
    color: '#444',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#111',
    fontWeight: 'bold',
  },
  tabContent: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    margin: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 15,
    marginTop: 20,
    color: '#111',
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  gradientButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

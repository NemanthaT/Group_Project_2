import { StyleSheet } from 'react-native';

export const volunteerProgramStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  hero: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  heroTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#E5E5E5',
    textAlign: 'center',
    marginTop: 5,
  },
  logo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginTop: 30,
      alignSelf: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  filterButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 2,
  },
  filterText: {
    fontSize: 12,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  progressBar: {
    flex: 1,
    height: 5,
    backgroundColor: '#DDD',
    borderRadius: 3,
  },
  checkIcon: {
    marginLeft: 5,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 6,
  },
  aboutLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 6,
  },
  aboutValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  editButton: {
    backgroundColor: '#E5E5E5',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  editButtonText: {
    color: '#333',
    fontSize: 14,
  },
  viewButton: {
    backgroundColor: '#7B61FF',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7B61FF',
    borderRadius: 3,
  },
  cardRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  cardSideImage: {
    width: 140,
    height: '100%',
    resizeMode: 'cover',
  },
  cardSideContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  badgeBackground: {
    alignSelf: 'flex-end',
    backgroundColor: '#e7ecf5ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  badgeText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '500',
  },
  badgeRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8,
  },
  badge: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  locationText: {
    color: '#0047AB', 
    fontSize: 12, 
    fontWeight: '500', 
    marginLeft: 4, 
  },
  detailsButton: {
    borderColor: '#0047AB',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  detailsButtonText: {
    color: '#0047AB',
    fontSize: 14,
  },
  donateButton: {
    backgroundColor: '#0047AB',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 14,
  }
});
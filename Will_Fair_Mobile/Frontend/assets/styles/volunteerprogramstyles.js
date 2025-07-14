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
    fontSize: 14,
    color: '#333',
  },
  newRequestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7B61FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  newRequestText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
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
    padding: 15,
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
    marginVertical: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  aboutLabel: {
    fontSize: 14,
    color: '#555',
  },
  aboutValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
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
});
import { StyleSheet } from 'react-native';

export const programStyles = StyleSheet.create({
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
    color: "#6005b5ff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "700",
    
  },

  headerLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  mainImage: {
    width: '90%',
    height: 180,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 20,
  },
  locationCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#0047AB',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#0047AB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 10,
    marginTop: 15,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#9333EA",
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    marginBottom: 2,
    fontWeight:'bold',
    color : '#000',
  },
  value: {
    fontWeight: 'bold',
    color: '#000',
  },
  statusPill: {
    backgroundColor: '#0047AB',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  description: {
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
    textAlign: 'justify',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  feedbackButton: {
    backgroundColor: '#7B61FF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  feedbackText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  editButton: {
    backgroundColor: '#9333EA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 5,
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  removeButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 5,
  },
  removeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});

# My Donation Requests - Real Data Integration

## Overview
Successfully integrated real database queries for the "My Donation Requests" page, replacing dummy data with actual donation requests filtered by the logged-in donee's ID.

## Backend Changes

### 1. Model (`donationModel.js`)
Added function to fetch donation requests by donee ID:
```javascript
getDonationsByDoneeId(doneeId)
```
- Joins `donation_requests` with `donation_categories` table
- Filters by `donee_id`
- Returns all request fields including category name
- Orders by `created_at DESC`

### 2. Controller (`donationController.js`)
Added controller function:
```javascript
getMyDonationRequestsMobile(req, res)
```
Features:
- Extracts `doneeId` from URL parameters
- Calls model to fetch donations
- Maps category images using `findCategoryImage()` helper
- Constructs absolute image URLs for each request
- Returns JSON: `{ success: true, donations: [...] }`

### 3. Routes (`donationRoutes.js`)
Added route (must come before generic `:id` route):
```javascript
router.get('/donations/my/:doneeId', getMyDonationRequestsMobile);
```

**Full API Endpoint:** `GET http://localhost:5000/api/donations/my/:doneeId`

## Frontend Changes (`mydonationreq.jsx`)

### 1. Imports Added
- `ActivityIndicator` - Loading spinner
- `Alert` - Error messages
- `AsyncStorage` - Read user data
- `API_BASE` - Backend URL constant

### 2. State Management
```javascript
const [allRequests, setAllRequests] = useState([]);
const [loading, setLoading] = useState(true);
const [userData, setUserData] = useState(null);
```

### 3. Data Fetching
Implemented `loadUserDataAndFetchRequests()`:
- Reads from AsyncStorage (keys: 'userData' and 'user')
- Validates user is a donee
- Fetches from: `${API_BASE}/api/donations/my/${donee_id}`
- Updates state with real data

### 4. Card Rendering Updated
Field mappings:
- `id` → `request_id`
- `target` → `quantity_needed`
- `raised` → `quantity_received`
- `category` (from join)
- `image_url` (from backend)
- `type` (Monetary/Item) - case-insensitive comparison

Image rendering:
- Uses `{uri: item.image_url}` for backend images
- Shows fallback icon if image missing

### 5. Loading UI
- Shows `ActivityIndicator` while `loading === true`
- Displays "Loading your requests..." message

## API Response Format

```json
{
  "success": true,
  "donations": [
    {
      "request_id": 66,
      "title": "Need money for my brain surgery",
      "quantity_needed": 100000,
      "quantity_received": 0,
      "due_date": "2025-10-30T18:30:00.000Z",
      "type": "Monetary",
      "category_id": 1,
      "donee_id": 52,
      "status": "Active",
      "created_at": "2025-10-18T20:11:43.533Z",
      "category": "Healthcare",
      "image_url": "http://192.168.122.72:5000/uploads/images/healthcare.jpg"
    }
  ]
}
```

## Testing Instructions

### 1. Start Backend Server
```bash
cd Will_Fair_Mobile\Backend
node server.js
```

Server should show:
```
🚀 Server running on port 5000
📍 Server URL: http://localhost:5000
```

### 2. Test API Endpoint (Optional)
Using PowerShell:
```powershell
curl http://localhost:5000/api/donations/my/52
```

Expected: JSON response with donations array

### 3. Test in Mobile App
1. Start the Expo app
2. Login as a donee (e.g., donee_id: 52)
3. Navigate to "My Donation Requests" from sidebar
4. Should see:
   - Loading spinner initially
   - Real donation requests with:
     - Category name after title
     - Category-based images
     - Correct quantity values
     - Progress bars
     - Edit/View buttons working

### 4. Check Console Logs
Watch for these logs:
```
Fetching requests for donee_id: 52
API URL: http://192.168.122.72:5000/api/donations/my/52
Response status: 200
Response ok: true
Successfully loaded X requests
```

## Troubleshooting

### Issue: "Route not found"
**Solution:** 
1. Ensure backend server is restarted after code changes
2. Verify route order (specific routes before generic `:id`)
3. Check `donationRoutes.js` is imported in `server.js`

### Issue: Images not showing
**Solution:**
1. Verify images exist in `Backend/uploads/images/`
2. Check image URLs in API response
3. Ensure static file serving is enabled: `app.use('/uploads', express.static(...))`

### Issue: Empty list
**Solution:**
1. Verify donee_id is correct
2. Check database has requests for that donee
3. Run SQL: `SELECT * FROM donation_requests WHERE donee_id = 52;`

### Issue: Type mismatch (Monetary vs monetary)
**Solution:**
- Frontend now handles both cases with `.toLowerCase()`
- Database stores as "Monetary" (capitalized)

## Database Schema Reference

### donation_requests table
- `request_id` (PK)
- `title`
- `description`
- `quantity_needed`
- `quantity_received`
- `due_date`
- `type` (Monetary/Item)
- `category_id` (FK)
- `donee_id` (FK)
- `status`
- `created_at`
- `updated_at`

### donation_categories table
- `category_id` (PK)
- `category_name`

## Authentication Flow

1. User logs in → Response saved to AsyncStorage
2. Keys used:
   - `'userData'` - Main user object
   - `'user'` - Backup/alternative key
3. User object contains:
   - `donee_id` (for donees)
   - `user_type` ('donee' or 'donor')
   - Other profile info

## Next Steps (Optional Enhancements)

1. ✅ Filter by status (Active/Completed)
2. ✅ Add pull-to-refresh
3. ✅ Add delete functionality
4. ✅ Link to edit page with pre-filled data
5. ✅ Add search/filter by category
6. ✅ Show verification badge for verified requests

## Files Modified

### Backend
- `Will_Fair_Mobile/Backend/models/donationModel.js`
- `Will_Fair_Mobile/Backend/controllers/donationController.js`
- `Will_Fair_Mobile/Backend/routes/donationRoutes.js`

### Frontend
- `Will_Fair_Mobile/Frontend/app/(drawer)/mydonationreq.jsx`

## Success Criteria
✅ Backend endpoint returns filtered donations  
✅ Frontend fetches data on component mount  
✅ Loading indicator shows during fetch  
✅ Real data displays with correct field mapping  
✅ Images load from backend URLs  
✅ Empty state handles no results gracefully  
✅ Error handling with user-friendly alerts  
✅ All existing styles preserved  

---
**Status:** ✅ Implementation Complete  
**Date:** October 19, 2025  
**Tested:** Backend API working (curl test successful)

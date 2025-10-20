# Event Creation Network Error Fix

## Current Issue
Getting "Network Error" when trying to create an event from the mobile app.

```
LOG  Calling onSubmit with formData...
LOG  Submitting event to API...
ERROR  Error creating event: [AxiosError: Network Error]
LOG  onSubmit result: {"success": false}
```

## Root Causes

### 1. Backend Server Not Restarted
The backend code was updated but the server (PID 4988) is still running the old code.

### 2. Potential FormData Issues
React Native's FormData implementation may have compatibility issues with the backend's multer middleware.

## Solutions

### Solution 1: Restart the Backend Server (IMMEDIATE)

**Step 1:** Stop the current backend server
```cmd
taskkill /PID 4988 /F
```

**Step 2:** Navigate to backend directory and start server
```cmd
cd "e:\Desktop\Uni\yr3\Project Willfair\Group_Project_2\Will_Fair_Mobile\Backend"
node server.js
```

Or use nodemon for auto-restart:
```cmd
npx nodemon server.js
```

### Solution 2: Test the Endpoint

After restarting, test if the endpoint is accessible:

```cmd
curl -X POST http://localhost:5000/api/events/test -H "Content-Type: application/json" -d "{\"test\":\"data\"}"
```

Expected response:
```json
{"success": true, "message": "Test endpoint works", "body": {"test": "data"}}
```

### Solution 3: Verify Mobile Connection

Make sure your mobile device/emulator can reach the backend:

1. **Check API_BASE URL** in `Frontend/app/constants/API.js`:
   - Currently: `http://10.203.170.71:5000`
   - This should be your computer's IP address on the local network

2. **Test from mobile browser**:
   - Open browser on your device/emulator
   - Navigate to: `http://10.203.170.71:5000/api/health`
   - Should return: `{"status": "Backend is working!"}`

3. **For Android Emulator**:
   - Use `http://10.0.2.2:5000` instead of `localhost`
   - Or use your actual IP address

4. **For iOS Simulator**:
   - `localhost` or your actual IP should work

### Solution 4: Check Firewall

Ensure Windows Firewall allows connections on port 5000:

```cmd
netsh advfirewall firewall add rule name="Node.js Server" dir=in action=allow protocol=TCP localport=5000
```

## Debugging Steps

### 1. Check if backend is receiving the request

After restarting the server, watch the console when you submit the form. You should see:

```
=== CREATE EVENT REQUEST RECEIVED ===
Request body: { ... }
Request files: { ... }
Request headers: { ... }
=====================================
```

### 2. If you see CORS errors

Add this to `server.js` (already present but verify):

```javascript
app.use(cors());
```

### 3. If multer errors appear

The issue might be with file uploads. Check:
- File size limits (current: 10MB)
- File types being sent
- FormData field names match ('image', 'documents')

## What Was Updated

### Backend Files Changed:
1. ✅ `models/eventModel.js` - Added event creation functions
2. ✅ `controllers/eventController.js` - Added createEventMobile function
3. ✅ `routes/eventRoutes.js` - Added POST route with multer

### Frontend Files Changed:
1. ✅ `app/(drawer)/events/events.jsx` - Fixed prop name and added API call
2. ✅ `app/(drawer)/events/AddEventModal.jsx` - Added error handling

## Next Steps

1. **RESTART THE BACKEND SERVER** (most important!)
2. Test the simple endpoint first (`/api/events/test`)
3. Try creating an event without files first
4. Then test with files

## Alternative: Disable File Uploads Temporarily

If file uploads are causing issues, you can test without them first by creating a simpler endpoint:

```javascript
// In routes/eventRoutes.js
router.post('/events/simple', eventController.createEventMobileSimple);
```

Then create a simplified controller that doesn't use multer.

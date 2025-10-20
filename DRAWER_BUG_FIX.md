# Drawer Menu User Type Bug Fix

## Problem
When logging in as a **donee**, the drawer was showing **donor** menu items instead of donee menu items.

## Root Cause
**AsyncStorage Key Mismatch:**
- The `saveUserData()` function in `utils/authStorage.js` saves user data to the key `'userData'`
- The drawer was reading from the key `'user'` (wrong key)
- This caused the drawer to always get `null` and default to `'donor'`

## Solution

### 1. Fixed AsyncStorage Key Reading
Updated `customerdrawer.jsx` to check both keys:
```javascript
// Try 'userData' first (used by saveUserData function), then fall back to 'user'
let userData = await AsyncStorage.getItem('userData');
if (!userData) {
  userData = await AsyncStorage.getItem('user');
}
```

### 2. Fixed Username Field Reading
Also updated to handle both field name formats:
```javascript
setUsername(user.firstName || user.first_name || user.username || 'User');
```

### 3. Added Visual Indicator
Added a user type badge in the drawer profile section:
```jsx
<Text style={styles.userTypeLabel}>
  {userType === 'donee' ? '👤 Donee' : '💰 Donor'}
</Text>
```

### 4. Added Debug Logging
Added console logs to help debug any future issues:
```javascript
console.log('=== DRAWER DEBUG ===');
console.log('Raw userData from AsyncStorage:', userData);
console.log('Parsed user object:', user);
console.log('User type:', user.user_type);
console.log('Setting userType to:', user.user_type || 'donor');
```

## Testing Steps

1. **Clear app data** (or logout if already logged in)
2. **Login as Donee:**
   - Use phone number and password
   - Open drawer menu
   - Check console logs show: `User type: donee`
   - Verify you see badge "👤 Donee"
   - Verify menu shows:
     - ✅ Home
     - ✅ Donation Request Form
     - ✅ My Donation Requests
     - ✅ Events
     - ✅ Profile
     - ❌ NOT: View Donations

3. **Logout and Login as Donor:**
   - Use email and password
   - Open drawer menu
   - Check console logs show: `User type: donor`
   - Verify you see badge "💰 Donor"
   - Verify menu shows:
     - ✅ Home
     - ✅ View Donations
     - ✅ Events
     - ✅ Profile
     - ❌ NOT: Donation Request Form
     - ❌ NOT: My Donation Requests

## Console Output Example

**For Donee Login:**
```
=== DRAWER DEBUG ===
Raw userData from AsyncStorage: {"donee_id":1,"donor_id":1,"phone":"1234567890","first_name":"John","last_name":"Doe","user_type":"donee"}
Parsed user object: {donee_id: 1, donor_id: 1, phone: "1234567890", first_name: "John", last_name: "Doe", user_type: "donee"}
User type: donee
Setting userType to: donee
```

**For Donor Login:**
```
=== DRAWER DEBUG ===
Raw userData from AsyncStorage: {"donor_id":1,"email":"donor@test.com","first_name":"Jane","last_name":"Smith","user_type":"donor"}
Parsed user object: {donor_id: 1, email: "donor@test.com", first_name: "Jane", last_name: "Smith", user_type: "donor"}
User type: donor
Setting userType to: donor
```

## Files Modified

1. ✅ `app/components/customerdrawer.jsx`
   - Fixed AsyncStorage key reading
   - Added visual user type badge
   - Added debug logging
   - Fixed username field handling

## Status
✅ **FIXED** - Drawer now correctly shows menu items based on user type

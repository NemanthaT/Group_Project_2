# Conditional Drawer Menu Implementation

## Summary
The drawer menu now shows different navigation options based on whether the logged-in user is a **Donor** or a **Donee**.

## Changes Made

### 1. **Donor Login** (`login.jsx`)
Updated to save `user_type: 'donor'` in AsyncStorage:
```javascript
user: {
  donor_id: data.user.id,
  email: data.user.email,
  first_name: data.user.firstName,
  last_name: data.user.lastName,
  user_type: 'donor'  // ← Added this
}
```

### 2. **Donee Login** (`donee_login.jsx`)
Already saves `user_type: 'donee'` in AsyncStorage:
```javascript
user: {
  donee_id: data.donee.id,
  donor_id: data.donee.id,
  phone: data.donee.phone,
  first_name: data.donee.firstName,
  last_name: data.donee.lastName,
  user_type: 'donee'  // ← Already present
}
```

### 3. **Custom Drawer** (`customerdrawer.jsx`)
Updated to:
- Fetch `user_type` from AsyncStorage
- Default to 'donor' if user_type is not specified
- Conditionally render menu items based on user type

## Menu Structure

### For **DONEES** (user_type: 'donee')
```
✓ Home
✓ Donee - Donation Request (create new donation requests)
✓ My Donation Requests (view their own requests)
✓ Events
✓ Profile
✓ Logout
```

### For **DONORS** (user_type: 'donor')
```
✓ Home
✓ Donor - Requests View (view all requests to donate to)
✓ Events
✓ Profile
✓ Logout
```

## Logic Flow

```
User Logs In
    ↓
Is user_type === 'donee'?
    ↓
YES → Show Donee Menu Items
    - Donee - Donation Request
    - My Donation Requests
    ↓
NO → Show Donor Menu Items
    - Donor - Requests View
    ↓
BOTH → Always Show
    - Home
    - Events
    - Profile
    - Logout
```

## Code Implementation

**customerdrawer.jsx:**
```jsx
{/* Show for DONEES only */}
{userType === 'donee' && (
  <>
    <TouchableOpacity onPress={() => navigateTo('/(drawer)/monetory')} style={styles.menuButton}>
      <Text style={styles.menuText}>Donee - Donation Request</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigateTo('/(drawer)/mydonationreq')} style={styles.menuButton}>
      <Text style={styles.menuText}>My Donation Requests</Text>
    </TouchableOpacity>
  </>
)}

{/* Show for DONORS only */}
{userType === 'donor' && (
  <TouchableOpacity onPress={() => navigateTo('/(drawer)/request_view')} style={styles.menuButton}>
    <Text style={styles.menuText}>Donor - Requests View</Text>
  </TouchableOpacity>
)}

{/* Show for BOTH */}
<TouchableOpacity onPress={() => navigateTo('/(drawer)/events/events')} style={styles.menuButton}>
  <Text style={styles.menuText}>Events</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => navigateTo('/(drawer)/profile')} style={styles.menuButton}>
  <Text style={styles.menuText}>Profile</Text>
</TouchableOpacity>
```

## Testing Checklist

- [ ] Login as a **Donor** (using email/password)
  - [ ] Verify drawer shows: Home, Donor - Requests View, Events, Profile
  - [ ] Verify drawer DOES NOT show: Donee - Donation Request, My Donation Requests
  
- [ ] Login as a **Donee** (using phone/password)
  - [ ] Verify drawer shows: Home, Donee - Donation Request, My Donation Requests, Events, Profile
  - [ ] Verify drawer DOES NOT show: Donor - Requests View

- [ ] Test navigation to each menu item
- [ ] Test logout functionality

## Technical Details

- **State Management:** Uses React useState to store userType
- **Data Source:** AsyncStorage key 'user'
- **Default Behavior:** If user_type is missing, defaults to 'donor'
- **Conditional Rendering:** Uses JSX conditional rendering with `{condition && <Component />}`

## Benefits

✅ **Better UX:** Users only see relevant menu items for their role
✅ **Clean Interface:** Reduces clutter by hiding irrelevant options
✅ **Role-Based Access:** Prevents donees from accessing donor-specific features and vice versa
✅ **Scalable:** Easy to add more role-specific menu items in the future

## Future Enhancements (Optional)

Consider adding:
- Role indicator badge in the profile section
- Different profile images for donors vs donees
- Statistics dashboard specific to each role
- Admin role with additional menu items

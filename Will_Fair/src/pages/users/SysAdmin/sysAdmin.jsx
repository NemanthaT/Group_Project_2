import AdminDashboard from "./screens/Dashboard/AdminDashboard";

function SysAdmin() {
    const user = JSON.parse(localStorage.getItem("userData"));
    console.log(user);
    
    return (
        <Routes>
        <Route path="*" element={<AdminDashboard user={user} />} />
        {/* Add more routes as needed */}
        </Routes>
    );
}

export default SysAdmin;
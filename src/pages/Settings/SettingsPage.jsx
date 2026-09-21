import { useState,useEffect } from "react";
import { getProfile, updateProfile } from "../../services/userService";
import { changePassword } from "../../services/authService";

function SettingsPage(){

    const [profile,setProfile]=useState({
        name:"",
        email:"",
        phone:""
    });

    const[loading,setLoading]=useState(true);
    const[saving,setSaving]=useState(false);
    const[error,setError]=useState(null);
    const[success,setSuccess]=useState("");

    const[passwordData,setPasswordData]=useState({
        currentPassword:"",
        newPassword:"",
        confirmPassword:""
    });

    const [passwordLoading,setPasswordLoading]=useState(false);
    const [passwordError, setPasswordError] = useState(""); 
    const [passwordSuccess, setPasswordSuccess] = useState("");


    useEffect(()=>{
        loadProfile();
    },[]);

    const loadProfile= async ()=>{
        try{
            setLoading(true);
            setError(null);

            const data=await getProfile();

            setProfile({
                name: data.name || "",
                email: data.email || "",
                phone: data.phone || ""
            });

        }catch(error){
            console.error(error);
            setError("Failed to Load profile")
        }finally{
            setLoading(false);
        }
    };


    const handleChange= (event) =>{
        const {name,value}= event.target;
        setProfile(prev=>({
            ...prev,
            [name]:value
        }));
    };


    const handleSubmit = async(event) =>{
        event.preventDefault();
        try{
            setSaving(true);
            setError(null);
            setSuccess("");

            const updatedProfile= await updateProfile(profile);

            setProfile({
                name: updatedProfile.name || "",
                email: updatedProfile.email || "",
                phone: updatedProfile.phone || ""
            });

            setSuccess("Profile updated Successfully");

        }catch(error){
            console.error(error);
            setError("Failed to update profile")
        }finally{
            setSaving(false);
        }
    };

    const handlePasswordChange= (event)=>{
        const{name,value}=event.target;
        setPasswordData(prev=>({
            ...prev,
            [name]:value
        }));
    };

    const handlePasswordSubmit =async (event)=>{
        event.preventDefault();
        setPasswordError("");
        setPasswordSuccess("");
        const { currentPassword, newPassword, confirmPassword } = passwordData;


        if(!currentPassword || !newPassword || !confirmPassword){
            setPasswordError("Please fill all password fields");
            return;
        }

        if(newPassword !== confirmPassword){
            setPasswordError("New password and confirm Password do not match");
            return;
        }

        if(newPassword === currentPassword){
            setPasswordError("new Password cannot be same as the current Password");
            return;
        }

        try{
            setPasswordLoading(true);
            const response= await changePassword(currentPassword,newPassword,confirmPassword);
            setPasswordSuccess(response || "Password changed Successfully");

            setPasswordData({
                currentPassword:"",
                newPassword:"",
                confirmPassword:""
            });

        }catch(error){
            console.error("Change password error:", error);
            const message = error.response?.data?.message ||
                                error.response?.data || 
                                    "Failed to change password.";
            setPasswordError(message);

        }finally{
            setPasswordLoading(false);
        }

    }


    if(loading){
        return <p>Loading Profile....</p>
    }

    return(
        <div>
            <h1>Settings</h1>

            <h2>Profile</h2>
            {error && (
                <p style={{color:"red"}}>{error}</p>
            )}
            {success && (
                <p style={{color:"green"}}>{success}</p>
            )}

            <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit"
                        disabled={saving}
                    >
                        {saving ? "Saving...." : "Save Changes"}
                    </button>
            </form>

            <hr />

            <h2>Change Password</h2>

            {passwordError && (
                <p style={{color: "red"}}>{passwordError}</p>
            )}

            {passwordSuccess && (
                <p style={{color:"green"}}>{passwordSuccess}</p>
            )}

            <form onSubmit={handlePasswordSubmit}>

                <div>
                    <label>Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter current Password"
                    />
                </div>

                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new Password"
                    />
                </div>

                <div> 
                    <label>Confirm New Password</label> 
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        value={passwordData.confirmPassword} 
                        onChange={handlePasswordChange} 
                        placeholder="Confirm new password" 
                    /> 
                </div>

                <button
                    type="submit"
                    disabled={passwordLoading}
                >
                    {passwordLoading ? "Changing password..." : "Change Password"}
                </button>


            </form>


        </div>

    );


}

export default SettingsPage;

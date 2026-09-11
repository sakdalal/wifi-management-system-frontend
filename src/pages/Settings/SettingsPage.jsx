import { useState,useEffect } from "react";
import { getProfile, updateProfile } from "../../services/userService";

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


        </div>

    );


}

export default SettingsPage;

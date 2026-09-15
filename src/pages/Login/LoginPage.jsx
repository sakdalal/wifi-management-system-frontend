import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

function LoginPage(){

    const navigate= useNavigate();

    const[email,setEmail]= useState("");
    const[password,setPassword]=useState("");

    const[loading,setLoading]=useState(false);
    const[error,setError]=useState(null);

    const handleSubmit= async(event)=>{
        event.preventDefault();
        setLoading(true);
        setError(null);

        try{

            const data= await login(email,password);
            localStorage.setItem(
                "accessToken",
                data.accessToken
            );

            localStorage.setItem(
                "refreshToken",
                data.refreshToken
            );

            localStorage.setItem(
                "companyId",
                data.companyId
            );

            localStorage.setItem(
                "role",
                data.role
            );

            navigate("/dashboard");

        }catch(error){
            console.error(error);
            setError(
                error.response?.data?.message ||
                "Invalid email or password"
            );
        }finally{
            setLoading(false);
        }
    }


    return(
        <div>
            <h1>Login</h1>
            {error && (
                <p style={{color:"red"}}>{error}</p>
            )}
            
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />
                </div>

                 <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>
        </div>
    );

}

export default LoginPage;
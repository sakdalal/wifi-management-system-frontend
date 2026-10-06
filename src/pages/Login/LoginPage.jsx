import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import "./LoginPage.css";

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

        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h1>Isp SaaS</h1>
                    <p>Sign in to your account</p>
                </div>

            {error && (
                <div className="login-error">
                    {error}
                </div>
            )}
            
            <form 
                className="login-form"
            onSubmit={handleSubmit}>

                <div className="login-form-group">
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

                 <div className="login-form-group">
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
                    className="login-button"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>
            </div>
        </div>
    );

}

export default LoginPage;
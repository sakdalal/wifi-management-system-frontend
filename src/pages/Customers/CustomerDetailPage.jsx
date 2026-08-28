import { useEffect, useState } from "react";
import { getCustomer } from "../../services/customerServices";
import { useNavigate, useParams } from "react-router-dom";


function CustomerDetailPage(){

    const [customer,setCustomer]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const navigate= useNavigate();

    const {id}=useParams();

    useEffect(()=>{
        const fetchCustomer = async ()=>{
            try{
                setLoading(true);
                const data= await getCustomer(id);
                setCustomer(data);

            } catch(error){
                console.error(error);
                setError("Failed to load Customer");
            } finally{
                setLoading(false);
            }
        };

        fetchCustomer();
    },[id]);

    if(loading){
        return <p>Loading Customer....</p>;
    }

    if(error){
        return <p>{error}</p>;
    }

    if(!customer){
        return <p>Customer Not Found</p>;
    }


    return(

        <div>
            <button onClick={() => navigate("/customers")}>
                Back to Customers
            </button>
            <h1>Customer Details</h1>
            <p>
                <strong>Name:</strong> {customer.name}
            </p>

            <p>
                <strong>Email:</strong> {customer.email}
            </p>

            <p>
                <strong>Phone:</strong> {customer.phone}
            </p>

            <p>
                <strong>Address:</strong> {customer.address}
            </p>

            <p>
                <strong>Status:</strong> {customer.status}
            </p>

            <p>
                <strong>Plan:</strong> {customer.currentPlan}
            </p>

            <p>
                <strong>Speed:</strong> {customer.speed}
            </p>

            <p>
                <strong>Price:</strong> {customer.price}
            </p>

        </div>

    );
}

export default CustomerDetailPage;
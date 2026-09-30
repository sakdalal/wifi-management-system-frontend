import { useEffect, useState } from "react";
import { getCustomer } from "../../services/customerServices";
import { useNavigate, useParams } from "react-router-dom";
import "./Customer.css";



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

        <div className="customer-detail-page">
            <div className="customer-detail-header">
                <button onClick={() => navigate("/customers")}>
                    Back to Customers
                </button>
                <h1>Customer Details</h1>
            </div>

            <div className="customer-detail-card">
                <span className="customer-detail-label">
                    Name
                </span>

                <span className="customer-detail-value">
                    {customer.name}
                </span>
            </div>
            <div className="customer-detail-card">
                <span className="customer-detail-label">
                    Email
                </span>

                <span className="customer-detail-value">
                    {customer.email}
                </span>
            </div>
            <div className="customer-detail-card">
                <span className="customer-detail-label">
                    Phone
                </span>

                <span className="customer-detail-value">
                    {customer.phone}
                </span>
            </div>
            <div className="customer-detail-card">
                <span className="customer-detail-label">
                    Address
                </span>

                <span className="customer-detail-value">
                    {customer.address}
                </span>
            </div>
            <div className="customer-detail-card">
                <span className="customer-detail-label">
                    Status
                </span>

                <span className="customer-detail-value">
                    {customer.status}
                </span>
            </div>
            <div className="customer-detail-card">
                <span className="customer-detail-label">
                    Plan
                </span>

                <span className="customer-detail-value">
                    {customer.currentPlan}
                </span>
            </div>
            <div className="customer-detail-card">
                <span className="customer-detail-label">
                    Speed
                </span>

                <span className="customer-detail-value">
                    {customer.speed}
                </span>
            </div>
            <div className="customer-detail-card">
                <span className="customer-detail-label">
                    Price
                </span>

                <span className="customer-detail-value">
                    {customer.price}
                </span>
            </div>

        </div>

    );
}

export default CustomerDetailPage;
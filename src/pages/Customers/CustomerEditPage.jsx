import { useEffect, useState } from "react";
import { getCustomer } from "../../services/customerServices";
import { useParams } from "react-router-dom";
import CustomerForm from "./CustomerForm";


function CustomerEditPage(){

    const {id}= useParams();
    const [customer,setCustomer]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    useEffect(()=>{

        const fetchCustomer = async()=>{

            try{
                const data= await getCustomer(id);
                setCustomer(data);
            }catch(error){
                console.error(error);
                setError("Failed to load Customers");
            }finally{
                setLoading(false);
            }
        }

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
            <h1>Edit Customer</h1>
            <CustomerForm customer={customer}/>
        </div>
    );

}

export default CustomerEditPage;
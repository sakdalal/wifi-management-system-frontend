import { useEffect, useState } from "react";
import { assignPlan, downgradePlan, getCustomer, upgradePlan } from "../../services/customerServices";
import { useParams } from "react-router-dom";
import CustomerForm from "./CustomerForm";
import { getPlans } from "../../services/planServices";


function CustomerEditPage(){

    const {id}= useParams();
    const [customer,setCustomer]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [plans,setPlans]=useState([]);
    const [loadingPlans,setLoadingPlans]= useState(true);
    const [changingPlan,setChangingPlan]=useState(false);
    const [selectedPlanId,setSelectedPlanId]=useState("");

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

        const fetchPlans= async()=>{
            try{
                const data= await getPlans();
                setPlans(data);
            }catch(error){
                console.error(error);
            } finally{
                setLoadingPlans(false);
            }
        }

        fetchCustomer();
        fetchPlans();
    },[id]);

    const handlePlanChange= async ()=>{

        if(!selectedPlanId){
            alert("Please select a plan!");
            return;
        }

        const selectedPlan= plans.find((plan)=>plan.id=== Number(selectedPlanId));

        if(!selectedPlan){
            return;
        }

        try{

            setChangingPlan(true);
            let updatedCustomer;

            if(!customer.planId){

                updatedCustomer= await assignPlan(customer.id,selectedPlan.id);

            } else{

                const currentPlan = plans.find((plan)=> plan.id=== customer.planId);
                if(!currentPlan){
                    alert("Current Plan cannot be found");
                    return;
                }

                if(selectedPlan.price>currentPlan.price){
                    updatedCustomer= await upgradePlan(customer.id,selectedPlan.id);
                } else if(selectedPlan.price<currentPlan.price){
                    updatedCustomer= await downgradePlan (customer.id,selectedPlan.id);
                } else{
                    alert("Customer already has a plan with the same price");
                    return;
                }
            }

            setCustomer(updatedCustomer);
            setSelectedPlanId("");
            alert("Plan updated Successfully");

        }catch(error){
            console.error(error);
            alert(error.response?.data?.message ||
                         "Failed to update plan");
        } finally{
            setChangingPlan(false);
        }

    };


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

            <hr />

            <h2>Plan</h2>

            {customer.planId ? (
                <div> 
                    <p>
                        <strong>Current Plan:</strong>{" "}
                        {customer.currentPlan}
                    </p>

                    <p>
                        <strong>Speed:</strong>{" "}
                        {customer.speed} Mbps
                    </p>

                    <p>
                        <strong>Price:</strong>{" "}
                        ₹{customer.price}/month
                    </p>
                
                </div>
            ) :(
            <p> Customer does not have a plan </p>
            )}

            {loadingPlans ? (
                <p>Loading plans...</p>
            ): (
                <div>
                    <label>Change Plan</label>
                    <select 
                        value={selectedPlanId}
                        onChange={(event)=> setSelectedPlanId(event.target.value)}
                    >
                        <option value="">Select a plan</option>
                        {plans
                            .filter((plan) => plan.active)
                            .map((plan) => (
                                <option
                                    key={plan.id}
                                    value={plan.id}
                                >
                                    {plan.planName} - ₹{plan.price}/month
                                </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={handlePlanChange}
                        disabled={changingPlan}
                    >
                        {changingPlan
                            ? "Updating..."
                            : customer.planId
                                ? "Change Plan"
                                : "Assign Plan"}
                    </button>

                </div>
            )}

        </div>

        
    );

}

export default CustomerEditPage;
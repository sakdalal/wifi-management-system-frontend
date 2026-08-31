
import { useState,useEffect } from "react";
import { deletePlan, getPlans } from "../../services/planServices";
import PlanForm from "./PlanForm";

function PlansPage(){

    const [plans,setPlans]= useState([]);
    const [loading,setLoading]= useState(true);
    const [error,setError]= useState(null);
    const [selectedPlan,setSelectedPlan]= useState(null);

    useEffect(()=>{
        fetchPlans();
    },[]);

    const fetchPlans = async ()=>{
        try{
            
            setLoading(true);
            const data= await getPlans();
            setPlans(data);
            console.log(data);

        }catch(error){
            console.error(error);
            setError("Failed to load Plans");
            
        } finally{
            setLoading(false);
        }
    }

    const handleDelete = async (id)=>{
        const confirmed= window.confirm("Are you sure you want to delete this plan?");

        if(!confirmed){
            return;
        }

        try{
            await deletePlan(id);
            fetchPlans();
        } catch(error){
            console.error(error);
        }
    }


        if(loading){
            return <p>Loading Plans...</p>;
        }
        if(error){
            return <p>{error}</p>;
        }

        return(
            <div>
                <h1>Plans</h1>
                <button onClick={()=> setSelectedPlan("new")}>
                    + Add Plan
                </button>
                { selectedPlan && (
                    <PlanForm
                        plan={selectedPlan==="new" ? null: selectedPlan}
                        onSuccess={()=>{
                            setSelectedPlan(null);
                            fetchPlans();
                        }}
                    />

                )}

                <div>
                    {plans.map((plan)=>(
                        <div key={plan.id}> 

                        <h2>{plan.planName}</h2>
                        <p>₹{plan.price}/month</p>
                        <p>{plan.speedMbps}</p>
                        <p>{plan.planStatus}</p>
                        <button onClick={()=>setSelectedPlan(plan)}>Edit</button>
                        <button onClick={()=>handleDelete(plan.id)}>Delete</button>

                        </div>
                    ))}

                </div>

            </div>

        );




}

export default PlansPage;
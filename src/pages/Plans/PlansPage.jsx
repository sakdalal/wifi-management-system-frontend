
import { useState,useEffect } from "react";
import { deletePlan, getPlans } from "../../services/planServices";
import PlanForm from "./PlanForm";
import "./PlansPage.css";

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
            <div className="plans-page">
                <h1>Plans</h1>
                <button 
                    className="add-plan-button"
                    onClick={()=> setSelectedPlan("new")}>
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

                <div className="plans-grid">
                    {plans.map((plan)=>(
                        <div className="plan-card"
                            key={plan.id}> 

                        <h2>{plan.planName}</h2>
                        <p className="plan-price">
                            ₹{plan.price}
                            <span>/month</span>
                        </p>
                        <div className="plan-info">
                            <p>
                                Speed: <strong>{plan.speedMbps} Mbps</strong>
                            </p>

                            <p>
                                Validity: <strong>{plan.validityDays} days</strong>
                            </p>

                            <span
                                className={`plan-status ${
                                    plan.planStatus === "ACTIVE"
                                        ? "active"
                                        : "inactive"
                                }`}
                            >
                                {plan.planStatus}
                            </span>
                        </div>
                        <div className="plan-actions">
                            <button
                                className="edit-plan-button"
                                onClick={() => setSelectedPlan(plan)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete-plan-button"
                                onClick={() => handleDelete(plan.id)}
                            >
                                Delete
                            </button>
                        </div>

                        </div>
                    ))}

                </div>

            </div>

        );




}

export default PlansPage;
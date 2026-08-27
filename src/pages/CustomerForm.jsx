import { useState } from "react";
import { createCustomer,updateCustomer } from "../services/customerServices";

function CustomerForm({customer,onSuccess}){

    const [formData,setFormData]= useState(
        customer||{
        name:"",
        email:"",
        currentPlan:"",
        speed:"",
        status:"ACTIVE"
    });

    const handleChange = (event)=>{
        const {name,value} =event.target;
        setFormData((previous)=>({
            ...previous,
            [name]:value
        }));
    }

    const handleSubmit= async (event)=>{
        event.preventDefault();

        if (!formData.name.trim()) {
            alert("Name is required");
            return;
        }

        if (!formData.email.trim()) {
            alert("Email is required");
            return;
        }

        try{
            if(customer){
                await updateCustomer(customer.id,formData);
                console.log("Customer updated");

            } else{
                await createCustomer(formData);
                console.log("Customer created");
            }
            onSuccess();

        }catch(error){
            console.error(error);
        }
    }

    return(

        <form onSubmit={handleSubmit}>

            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                name="currentPlan"
                value={formData.currentPlan}
                onChange={handleChange}
                placeholder="Plans"
            />
            <input
                name="speed"
                value={formData.speed}
                onChange={handleChange}
                placeholder="Speed"
            />
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}>

                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>

            </select>

            <button type="submit">
                 {customer ? "Update Customer" : "Create Customer"}
            </button>

        </form>

    );

}

export default CustomerForm;
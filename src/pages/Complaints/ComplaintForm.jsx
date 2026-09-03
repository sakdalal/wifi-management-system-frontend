import { useState } from "react";
import { createComplaint } from "../../services/complaintServices";

function ComplaintForm({onSuccess}){

    const [formData,setFormData]= useState({
        title:"",
        description:"",
        customerId:"",
        priority:"MEDIUM"
    });

    const [loading,setLoading]=useState(false);

    const handleChange= (event)=>{
        const {name,value} = event.target;
        setFormData((previous)=>({
            ...previous,
            [name]:value
        }));
    };

    const handleSubmit = async (event)=>{
        event.preventDefault();
        
        try{
            setLoading(true);

            const complaint={
                title: formData.title,
                description: formData.description,
                customerId: Number(formData.customerId),
                priority: formData.priority
            };

            await createComplaint(complaint);

            alert("Complaint created Successfully");

            setFormData({
                title: "",
                description: "",
                customerId: "",
                priority: "MEDIUM"
            })

            if(onSuccess){
                onSuccess();
            }

        }catch(error){
            console.error(error);
            alert("Failed to create Complaint")
        }finally{
            setLoading(false);
        }
    
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Customer ID</label>
                <input
                    type="number"
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Issue Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Priority</label>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
            >
                {loading? "Creating..." : "Create Complaint" }
            </button>

        </form>
    );

}

export default ComplaintForm;
import { useState,useEffect } from "react";
import { deleteComplaint, getComplaints } from "../../services/complaintServices";
import ComplaintForm from "./ComplaintForm";

function ComplaintPage(){

    const [complaints,setComplaints]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [statusFilter,setStatusFilter]=useState("ALL");
    const [showForm,setShowForm] = useState(false);


    useEffect(()=>{
        fetchComplaints();
    },[]);

    const fetchComplaints=async()=>{
        try{
            setLoading(true);
            const data= await getComplaints();
            setComplaints(data);

        }catch (error){
            console.error(error);
            setError("Failed to load complaints");
        }finally{
            setLoading(false);
        }
    }


    const handleDelete = async(id)=>{

        const confirmed= window.confirm("Are you sure you want to delete this complaint?");

        if(!confirmed){
            return;
        }

        try{
            await deleteComplaint(id);
            setComplaints((previous)=>
                previous.filter((complaint)=> complaint.id !==id)
            );
            alert("Complaint deleted successfully");

        } catch(error){
            console.error(error);
            alert("Failed to delete complaint");
        }

    }



    const filteredComplaints= 
            statusFilter=== "ALL" ? complaints 
                : complaints.filter((complaint)=>complaint.status== statusFilter); 


    if(loading){
        return<p>Loading Complaints....</p>
    }

    if(error){
        return<p>{error}</p>
    }

    return(
        <div>
            <h1>Complaints</h1>
            <p> Manage customer complaint and support issues</p>

            <button onClick={()=> setShowForm(!showForm)}>
                {showForm ? "Close Form" : "+ Create Complaint"}
            </button>

            {showForm && (
                <ComplaintForm
                    onSuccess={()=>{
                        setShowForm(false);
                        fetchComplaints();
                    }}
                />
            )}

            <div>
                <label>Status: </label>
                <select
                    value={statusFilter}
                    onChange={(event) =>
                    setStatusFilter(event.target.value)
                    }
                >
                    <option value="ALL">All</option>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">
                    In Progress
                    </option>
                    <option value="RESOLVED">
                    Resolved
                    </option>
                    <option value="CLOSED">
                    Closed
                    </option>
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Issue</th>
                        <th>Priority</th>
                        <th>Assigned Employee</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>
                    {filteredComplaints.length === 0 ?(
                        <tr>
                            <td colSpan="8">
                                No Complaints found.
                            </td>
                        </tr>
                    ):(
                        (filteredComplaints.map((complaint)=>(
                        <tr key={complaint.id}>
                            <td>#{complaint.id}</td>
                            <td>{complaint.customerName}</td>
                            <td>{complaint.title}</td>
                            <td>{complaint.priority}</td>
                            <td>{complaint.assignedEmployee ? complaint.assignedEmployee : "Unassigned"}</td>
                            <td>{complaint.status}</td>
                            <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button onClick={()=>handleDelete(complaint.id)}>Delete</button>
                            </td>
                            
                        </tr>
                    )))
                    )}
                    
                </tbody>
            </table>

        </div>
    );


}

export default ComplaintPage;
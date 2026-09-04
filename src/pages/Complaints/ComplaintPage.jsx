import { useState,useEffect } from "react";
import { deleteComplaint, getComplaints , 
    assignEmployee, updateComplaintStatus,
    getComplaintDashboardCounts} from "../../services/complaintServices";
import ComplaintForm from "./ComplaintForm";
import { getEmployees } from "../../services/employeeService";

function ComplaintPage(){

    const [complaints,setComplaints]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [statusFilter,setStatusFilter]=useState("ALL");
    const [showForm,setShowForm] = useState(false);
    const [employees,setEmployees]=useState([]);
    const [counts,setCounts]=useState({});


    useEffect(()=>{
        fetchComplaints();
    },[]);

    const fetchComplaints=async()=>{
        try{
            setLoading(true);
            const complaintData= await getComplaints();
            setComplaints(complaintData);

            const employeeData= await getEmployees();
            setEmployees(employeeData);

            const dashboardData= await getComplaintDashboardCounts();
            setCounts(dashboardData);  

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

            const dashboardData= await getComplaintDashboardCounts();
            setCounts(dashboardData);

            alert("Complaint deleted successfully");

        } catch(error){
            console.error(error);
            alert("Failed to delete complaint");
        }

    }


    const handleStatusChange = async (id,status)=>{

        try{

            const updatedComplaint = await updateComplaintStatus(id,status);

            setComplaints((previous)=> 
                previous.map((complaint)=>
                    complaint.id === id ? updatedComplaint : complaint
            ));
            const dashboardData= await getComplaintDashboardCounts();
            setCounts(dashboardData);

        }catch(error){
            console.error(error);
            alert("Failed to update complaint status");
        }

    };


    const handleAssignEmployee = async (id,employeeId)=>{

        try{

            const updateComplaint = await assignEmployee(id,Number(employeeId));

            setComplaints((previous)=>
                previous.map((complaint)=>
                    complaint.id === id ? updateComplaint : complaint));

        } catch(error){
            console.error(error);
            alert("Failed to assign employee ");
        }
    };


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
                <div>
                    <h3>Total</h3>
                    <p>{counts.total ?? 0}</p>
                </div>

                <div>
                    <h3>Open</h3>
                    <p>{counts.open ?? 0}</p>
                </div>

                <div>
                    <h3>In Progress</h3>
                    <p>{counts.inProgress ?? 0}</p>
                </div>

                <div>
                    <h3>Resolved</h3>
                    <p>{counts.resolved ?? 0}</p>
                </div>
            </div>

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
                            <td>
                                <select
                                    value={complaint.assignedEmployeeId || ""}
                                    onChange={(event)=> 
                                        handleAssignEmployee(complaint.id,event.target.value)}   
                                >

                                    {!complaint.assignedEmployeeId && (
                                        <option value="" disabled>Unassigned</option>
                                    )}
                                    
                                    {employees.map((employee)=>(
                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >{employee.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select
                                    value={complaint.status}
                                    onChange={(event)=>
                                        handleStatusChange(complaint.id,event.target.value)}
                                >
                                    {complaint.assignedEmployeeId ? (
                                        <>
                                            <option value="ASSIGNED">Assigned</option>
                                            <option value="RESOLVED">Resolved</option>
                                        </>
                                    ):(
                                        <>
                                            <option value="OPEN">Open</option>
                                            <option value="IN_PROGRESS">In Progress</option>
                                        </>
                                    )}
                                    
                                </select>
                            </td>
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
import { useState,useEffect } from "react";
import { generateBill, getBills } from "../../services/billService";
import { getCustomers } from "../../services/customerServices";
import { getPlans } from "../../services/planServices";
import PaymentForm from "../Payments/PaymentForm";
import "./BillPage.css";

function BillPage(){

    const[bills,setBills]=useState([]);
    const[loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [customers,setCustomers]=useState({ content: [] });
     const [selectedBill, setSelectedBill] = useState(null);

    const [formData, setFormData] = useState({
        customerId: ""
    });

    const [formError, setFormError] = useState(null);

    const handleChange= (event)=>{

        const{name,value}= event.target;
        setFormData((previous)=>({
            ...previous,
            [name]:value
        }));
    };

    const handleSubmit= async(event)=>{
        event.preventDefault();

        try{

            setFormError(null);

            await generateBill(Number(formData.customerId));

            setFormData({
                customerId: ""
            });

            fetchBills();

        }catch(error){
            console.error(error);
            setFormError("Failed to create Bill");
        }
    }

    useEffect(()=>{
        fetchBills();
    },[]);

    useEffect(()=>{
        const loadData = async()=>{

            try{

                const customersData= await getCustomers();
                setCustomers(customersData);

            }catch(error){
                console.error(error);
            }

        };

        loadData();
    },[]);

    const fetchBills = async()=>{
        try{

            setLoading(true);
            const data= await getBills();
            setBills(data);

        }catch(error){
            console.error(error);
            setError("Failed to load Bills");

        }finally{
            setLoading(false);
        }
    }

    
    if(loading){
            return <p>Bills Loading....</p>
    }

    if(error){
        return <p>{error}</p>
    }

    return(
        <div className="bill-page">
            <h1>Bills</h1>

            <div className="create-bill-card">

            

            <h2>Create Bill</h2>

            <form className="bill-form" 
                onSubmit={handleSubmit}>

                <div className="bill-form-group">
                    <label>Customer</label>
                    <select
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        required>
                        <option value="">Select Customer</option>
                        {customers.content.map((customer)=>(
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                        
                    </select>
                </div>

                {formError && <p>{formError}</p>}
                        
                <button className="create-bill-button"
                    type="submit">Create Bill</button>

            </form>

            </div>


            <div className="bills-table-card">
            <table className="bills-table">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Plan</th>
                        <th>Amount</th>
                        <th>Billing Month</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>
                <tbody>
                    {bills.map((bill)=>(
                        <tr key={bill.id}>

                            <td>{bill.customer.name}</td>
                            <td>{bill.planName}</td>
                            <td>₹{bill.amount}</td>
                            <td>{bill.billingMonth}</td>
                            <td>{bill.dueDate}</td>
                            <td>
                                <span
                                    className={`bill-status ${
                                        bill.paymentStatus === "PAID"
                                            ? "paid"
                                            : "pending"
                                    }`}
                                >
                                    {bill.paymentStatus}
                                </span>
                            </td>
                            <td>
                                {bill.paymentStatus === "PENDING" &&(
                                    <button className="pay-bill-button" 
                                        onClick={()=>setSelectedBill(bill)}>
                                        Pay Bill
                                    </button>
                                )}
                                {bill.paymentStatus === "PAID" && (
                                    <span className="paid-label">Paid</span>
                                )}
                            </td>

                        </tr>
                    ))}

                </tbody>
            </table>
            </div>
            {selectedBill && (
                <PaymentForm
                    bill={selectedBill}
                    onCancel={() => setSelectedBill(null)}
                    onPaymentSuccess={() => {
                        setSelectedBill(null);
                        fetchBills();
                    }}
                />
            )}
        </div>
        

    );


}

export default BillPage;
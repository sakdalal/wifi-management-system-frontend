import { useState,useEffect } from "react";
import { getPayments } from "../../services/paymentServices";
import BillPage from "../Bills/BillPage";
import "./PaymentsPage.css";

function PaymentsPage(){

    const[payments,setPayments]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
   

    useEffect(()=>{
        const fetchPayments=async()=>{
            try{
                const data= await getPayments();
                setPayments(data);

            }catch(error){
                console.error(error);
                setError("Failed to Load payments");
            }finally{
                setLoading(false);
            }
        };
        fetchPayments();
    },[]);

    if(loading){
        return <p className="payments-loading">Loading Payments....</p>
    }

    if(error){
        return <p className="payments-error">{error}</p>
    }

    return(
        <div className="payments-page">
            <h1>Payments</h1>
            {payments.length === 0 ? (
                <p className="payments-empty">No Payments found</p>
            ) :(
                <div className="payments-table-card">
                <table className="payments-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Transaction ID</th>
                            <th>Payment Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment)=>(
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                <td>{payment.customer?.name || "-"}</td>
                                <td>₹{payment.amount}</td>
                                <td>{payment.paymentMethod}</td>
                                <td>{payment.transactionId || "-"}</td>
                                <td>{payment.paymentDate
                                        ? new Date(
                                            payment.paymentDate
                                        ).toLocaleDateString()
                                        : "-"}
                                </td>
                                <td>
                                    <span
                                        className={`payment-status ${payment.status?.toLowerCase()}`}
                                    >
                                        {payment.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </div>
    );

}

export default PaymentsPage;
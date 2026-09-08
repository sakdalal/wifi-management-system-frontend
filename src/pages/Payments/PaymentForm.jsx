import { useState } from "react";
import { payBill } from "../../services/paymentServices";

function PaymentForm ({bill,onPaymentSuccess,onCancel}){

    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [transactionId, setTransactionId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event)=>{

        event.preventDefault();
        setLoading(true);
        try{

            const paymentData= {paymentMethod,transactionId};
            const payment= await payBill(bill.id,paymentData);
            onPaymentSuccess(payment);

        }catch(error){
            console.error(error);
            setError("Payment Failed");
        }finally{
            setLoading(false);
        }
    }

    return(
        <div>
            <h2>Pay Bill</h2>
            <p>Bill ID: {bill.id}</p>
            <p>Amount: ₹{bill.amount}</p>
            <form onSubmit={handleSubmit}>

                {error && (
                    <p>{error}</p>
                )}

                <div>
                    <label>Payment Method</label>
                    <select value={paymentMethod}
                            onChange={(event)=>setPaymentMethod(event.target.value)}>
                        <option value="UPI">UPI</option>
                        <option value="CARD">CARD</option>
                        <option value="CASH">CASH</option>
                    </select>
                </div>

                <br/>

                <div>
                    <label>Transaction ID</label>
                    <input
                        type="text"
                        value={transactionId}
                        onChange={(e) =>
                            setTransactionId(e.target.value)
                        }
                        placeholder="Enter transaction ID"
                        required
                    />
                </div>

                <button type="submit"
                        disabled={loading}>
                    {loading ? "Processing..." : "Pay Bill"}
                </button>

                <button type="button"
                    onClick={onCancel}
                    disabled={loading}
                >
                Cancel
                </button>
            </form>
        </div>
    );

}

export default PaymentForm;
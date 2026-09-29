import { useState } from "react";
import { payBill } from "../../services/paymentServices";
import "./PaymentsPage.css";

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
        <div className="payment-modal-overlay">
        <div className="payment-modal">
            <h2>Pay Bill</h2>
            <div className="payment-bill-info">
                <p>
                    Bill ID: <strong>#{bill.id}</strong>
                </p>

                <p>
                    Amount: <strong>₹{bill.amount}</strong>
                </p>
            </div>
            <form className="payment-form" 
                onSubmit={handleSubmit}>

                {error && (
                    <p className="payment-form-error">{error}</p>
                )}

                <div className="payment-form-group">
                    <label>Payment Method</label>
                    <select value={paymentMethod}
                            onChange={(event)=>setPaymentMethod(event.target.value)}>
                        <option value="UPI">UPI</option>
                        <option value="CARD">CARD</option>
                        <option value="CASH">CASH</option>
                    </select>
                </div>

                <br/>

                <div className="payment-form-group">
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

                <div className="payment-form-actions">

                <button type="submit"
                        className="pay-submit-button"
                        disabled={loading}>
                    {loading ? "Processing..." : "Pay Bill"}
                </button>

                <button type="button"
                    className="cancel-payment-button"
                    onClick={onCancel}
                    disabled={loading}
                >
                Cancel
                </button>
                </div>
            </form>
        </div>
        </div>
    );

}

export default PaymentForm;
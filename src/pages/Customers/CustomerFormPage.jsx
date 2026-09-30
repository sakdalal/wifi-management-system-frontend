import CustomerForm from "./CustomerForm";
import "./Customer.css";


function CustomerFormPage(){
    return(
        <div className="customer-form-page">
            <h1>Add Customer</h1>
            <CustomerForm/>
        </div>
    );

}

export default CustomerFormPage;
import { useState } from "react";
import {
  createCustomer,
  updateCustomer,
} from "../../services/customerServices";
import { useNavigate } from "react-router-dom";

function CustomerForm({ customer}) {

    const navigate= useNavigate();

    const [formData, setFormData] = useState(
        customer||{
        name: "",
        email: "",
        phone: "",
        address: "",
        status: "ACTIVE",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({
        ...previous,
        [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name.trim()) {
            alert("Name is required");
            return;
        }

        if (!formData.email.trim()) {
            alert("Email is required");
            return;
        }

        if (!formData.phone.trim()) {
            alert("Phone is required");
            return;
        }

        if (!formData.address.trim()) {
            alert("Address is required");
            return;
        }
        try{
            if(customer){
                await updateCustomer(customer.id,formData);
                console.log("Customer Updated");
            } else{
                await createCustomer(formData);
                console.log("Customer created");
            }
            navigate("/customers");
        }catch(error){
            console.error(error);
        }
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label>Name</label>
            <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            />
        </div>
        <div>
            <label>Email</label>
            <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            />
        </div>
        <div>
            <label>Phone</label>
            <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            />
        </div>
        <div>
            <label>Address</label>
            <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            />
        </div>
        <div>
            <label>Status</label>
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
            </select>
        </div>

        <button type="submit">
            {customer? "Update Customer" : "Create Customer"}
        </button>
        </form>
  );
}

export default CustomerForm;

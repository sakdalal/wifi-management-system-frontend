import { useState } from "react";
import { createPlan, updatePlan } from "../../services/planServices";

function PlanForm({ plan, onSuccess }) {
    const [formData, setFormData] = useState(
        plan || {
        planName: "",
        speedMbps: "",
        price: "",
        planStatus: "ACTIVE",
        active: true,
        validityDays: "",
        },
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({
        ...previous,
        [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
        if (plan) {
            await updatePlan(plan.id, formData);
        } else {
            await createPlan(formData);
        }
        onSuccess();
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            placeholder="Plan name"
        />
        <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
        />
        <input
            name="speedMbps"
            value={formData.speedMbps}
            onChange={handleChange}
            placeholder="Speed"
            type="number"
        />
        <select
            name="planStatus"
            value={formData.planStatus}
            onChange={handleChange}
        >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
        </select>
        <input
            name="validityDays"
            value={formData.validityDays}
            onChange={handleChange}
            placeholder="Validity (days)"
            type="number"
        />

        <button type="submit">{plan ? "Update Plan" : "Add Plan"}</button>
        </form>
    );
}

export default PlanForm;

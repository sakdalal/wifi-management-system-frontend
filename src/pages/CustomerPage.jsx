import { useState, useEffect } from "react";

import { getCustomers, deleteCustomer } from "../services/customerServices";

import CustomerForm from "./CustomerForm";

function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data.content);
    } catch (error) {
      console.error(error);
      setError("Failed to load Error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCustomer(id);

      setCustomers((previous) =>
        previous.filter((customer) => customer.id !== id),
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete customer");
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <p>Loading customers</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Customers</h1>

      {!showForm && (
        <>
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button onClick={() => {
            setEditingCustomer(null);
            setShowForm(true);
            }}>+ Add Customer</button>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Plan</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>

                  <td>{customer.email}</td>

                  <td>{customer.status}</td>

                  <td>{customer.currentPlan}</td>

                  <td>
                    <button
                      onClick={() => {
                        setEditingCustomer(customer);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>

                    <button onClick={() => handleDelete(customer.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {showForm && (
        <div>
          <h2>{editingCustomer
                ? "Edit Customer"
                : "Add Customer"}</h2>

          <CustomerForm
             customer={editingCustomer}
            onSuccess={() => {
              setShowForm(false);
              setEditingCustomer(null);
              fetchCustomers();
            }}
          />

          <button onClick={() => {
            setShowForm(false);
            setEditingCustomer(null);
            }}>
            Cancel</button>
        </div>
      )}
    </div>
  );
}

export default CustomerPage;

import { useState, useEffect } from "react";

import { getCustomers, deleteCustomer } from "../../services/customerServices";

import { useNavigate } from "react-router-dom";

function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search,setSearch] = useState("");
  const navigate= useNavigate();

  const filteredCustomers= customers.filter((customer)=>
        customer.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data.content);
      console.log(data.content);
    } catch (error) {
      console.error(error);
      setError("Failed to load Customers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id)=>{

    const confirmed= window.confirm("Are you sure you want to delete this customer?");

    if(!confirmed){
      return;
    }

    try{
      await deleteCustomer(id);

      setCustomers((previous)=> 
        previous.filter((customer)=>
          customer.id!==id
        )
      );

    }catch (error){
      console.error(error);
    }

  };

  if (loading) {
    return <p>Loading customers</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Customers</h1>
      <button onClick={()=> navigate("/customers/new")}>+ Add Customer</button>
      <input
        type="text"
        placeholder="Search Customers..."
        value={search}
        onChange={(event)=>setSearch(event.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Plan</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredCustomers.length===0 ?(
            <tr>
              <td colSpan="6">
                No Customers found</td>
            </tr>

          ):(filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>

              <td>{customer.email}</td>

              <td>{customer.phone}</td>

              <td>{customer.address}</td>

              <td>{customer.currentPlan}</td>

              <td>
                <button onClick={()=>navigate(`/customers/${customer.id}`)}>View</button>
                <button onClick={()=>navigate(`/customers/${customer.id}/edit`)}>Edit</button>
                <button onClick={()=>{handleDelete(customer.id)}}>Delete</button>
              </td>
            </tr>
          ))
          )
          }
        </tbody>
      </table>
    </div>
  );
}

export default CustomerPage;

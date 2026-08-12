function TopPlans({ data }) {
  return (
    <div className="chart-card">
      <h2>Top Plans</h2>
      <table className="plans-table">
        <thead>
          <tr>
            <th>Plan</th>
            <th>Customers</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((plan, index) => (
            <tr key={index}>
              <td>{plan.planName}</td>
              <td>{plan.customerCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopPlans;

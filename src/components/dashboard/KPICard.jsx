function KPICard({title,value}){

    return(
        <div className="kpi-card">
            <p>{title}</p>
            <h2>{value}</h2>
        </div>
    );

}

export default KPICard;
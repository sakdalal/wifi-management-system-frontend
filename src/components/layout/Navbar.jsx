import "./Navbar.css"

function Navbar(){

    const role= localStorage.getItem("role");

    return(
        <header className="navbar">
            <h1>Isp SaaS</h1>
            <div>
                <span>{role || "User"}</span>
            </div>
        </header>
    );
}

export default Navbar;
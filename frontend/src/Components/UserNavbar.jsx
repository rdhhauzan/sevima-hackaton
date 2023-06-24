import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UserNavbar() {
  const location = useLocation();
  let navigate = useNavigate();
  function logout() {
    localStorage.clear();
    Swal.fire("Success", "Logout Success", "success").then(() => navigate("/"));
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                exact
                to="/dashboard"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;

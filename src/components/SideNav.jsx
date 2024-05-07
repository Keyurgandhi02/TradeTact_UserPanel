import React from "react";
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <aside
      class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
      id="sidenav-main"
    >
      <div class="sidenav-header">
        <Link className="navbar-brand m-0" to="/">
          <span class="ms-1 font-weight-bold text-white">
            The Invest Circle
          </span>
        </Link>
      </div>

      <hr class="horizontal light mt-0 mb-2" />

      <div class="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link class="nav-link text-white" to="/">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">dashboard</i>
              </div>

              <span class="nav-link-text ms-1">Dashboard</span>
            </Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link text-white" to="/queuestocks">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">table_view</i>
              </div>

              <span class="nav-link-text ms-1">Queue Stocks</span>
            </Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link text-white" to="/journal">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">table_view</i>
              </div>
              <span class="nav-link-text ms-1">Trade Journal</span>
            </Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link text-white" to="/risk-management">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">table_view</i>
              </div>
              <span class="nav-link-text ms-1">Risk Management</span>
            </Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link text-white" to="/calculators">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">table_view</i>
              </div>
              <span class="nav-link-text ms-1">Calculators</span>
            </Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link text-white" to="/return-performance">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">table_view</i>
              </div>
              <span class="nav-link-text ms-1">Return Performance</span>
            </Link>
          </li>

          <li class="nav-item mt-3">
            <h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">
              Account pages
            </h6>
          </li>

          <li class="nav-item">
            <a class="nav-link text-white" href="./profile.html">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">person</i>
              </div>

              <span class="nav-link-text ms-1">Profile</span>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link text-white" href="./sign-in.html">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">login</i>
              </div>

              <span class="nav-link-text ms-1">Sign In</span>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link text-white" href="./sign-up.html">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">assignment</i>
              </div>

              <span class="nav-link-text ms-1">Sign Up</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideNav;

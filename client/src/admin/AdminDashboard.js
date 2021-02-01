import React from "react";
import Layout from "../core/Layout";
import { signout, isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Subject (category)
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create Book
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              Manage Books
            </Link>
          </li>
          {isAuthenticated() && (
              <li className="list-group-item">
              <Link className="nav-link" to="/">
                <li className="nav-item">
              <span
                  className="ui red button"
                  style={{ cursor: "pointer", color: "#ffffff" }}
                  onClick={() => signout(() => {})}>
                Signout
              </span>
                </li>
              </Link>
              </li>
          )}
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`G'day ${name}!`}
      className="container"
    >
      <div className="my-4">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-8 col-xs-8">
            {adminLinks()}
          </div>
          <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">
            {adminInfo()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

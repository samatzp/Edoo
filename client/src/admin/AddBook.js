import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddBook = () => {
  const [values, setValues] = useState({
    name: "",
    author: "",
    grade: "",
    categories: [],
    category: "",
    shipping: "",
    lang: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
    publisher: "",
    page: "",
    year: "",
    source: "",
    file: "",
  });

  const { user, token } = isAuthenticated();
  // eslint-disable-next-line
  const {
    name,
    author,
    grade,
    categories, // eslint-disable-next-line
    lang,
    loading,
    error,
    createdProduct, // eslint-disable-next-line
    formData,
    publisher,
    page,
    year,
    source,
    file,

  } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init(); // eslint-disable-next-line
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.append(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          author: "",
          photo: "",
          grade: "",
          lang: "",
          publisher: "",
          page: "",
          year: "",
          source: "",
          file: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };
  const goBack = () => (
      <div className="m-2">
        <Link to="/admin/dashboard" className="text-warning">
          Back to Dashboard
        </Link>
      </div>
  );
  const newPostForm = () => (
      <form align="left" className="card w-75 w-sm-100" onSubmit={clickSubmit}>
        <div className="card-body">
          <h4>Product Photo</h4>

          <div className="form-group">
            <div className="custom-file">
              <input
                  onChange={handleChange("photo")}
                  name="photo"
                  accept="image/*"
                  type="file"
                  required
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                Choose file
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
                onChange={handleChange("name")}
                type="text"
                required
                className="form-control"
                value={name}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Authors</label>
            <input
                onChange={handleChange("author")}
                type="text"
                required
                className="form-control"
                value={author}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Grade</label>
            <select onChange={handleChange("grade")} className="form-control">
              <option>select</option>
              <option value="1">1 grade</option>
              <option value="2">2 grade</option>
              <option value="3">3 grade</option>
              <option value="4">4 grade</option>
              <option value="5">5 grade</option>
              <option value="6">6 grade</option>
              <option value="7">7 grade</option>
              <option value="8">8 grade</option>
              <option value="9">9 grade</option>
              <option value="10">10 grade</option>
              <option value="11">11 grade</option>
            </select>
          </div>

          <div className="form-group">
            <label className="text-muted">Subject</label>
            <select onChange={handleChange("category")} className="form-control">
              <option>Please select</option>
              {categories &&
              categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="text-muted">Year</label>
            <select onChange={handleChange("year")} className="form-control">
              <option>Please select</option>
              <option value="2000">2000 year</option>
              <option value="2001">2001 year</option>
              <option value="2002">2002 year</option>
              <option value="2003">2003 year</option>
              <option value="2004">2004 year</option>
              <option value="2005">2005 year</option>
              <option value="2006">2006 year</option>
              <option value="2007">2007 year</option>
              <option value="2008">2008 year</option>
              <option value="2009">2009 year</option>
              <option value="2010">2010 year</option>
              <option value="2011">2011 year</option>
              <option value="2012">2012 year</option>
              <option value="2013">2013 year</option>
              <option value="2014">2014 year</option>
              <option value="2015">2015 year</option>
              <option value="2016">2016 year</option>
              <option value="2017">2017 year</option>
              <option value="2018">2018 year</option>
              <option value="2019">2019 year</option>
              <option value="2020">2020 year</option>
              <option value="2021">2021 year</option>


            </select>
          </div>

          <div className="form-group">
            <label className="text-muted">Page</label>
            <input
                onChange={handleChange("page")}
                type="number"
                className="form-control"
                value={page}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Book Language</label>
            <select onChange={handleChange("lang")} className="form-control">
              <option>select</option>
              <option value="1">KAZ</option>
              <option value="2">RUS</option>
              <option value="3">ENG</option>
            </select>
          </div>

          <div className="form-group">
            <label className="text-muted">Publisher</label>
            <input
                onChange={handleChange("publisher")}
                type="text"
                required
                className="form-control"
                value={publisher}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Source(weblink)</label>
            <input
                onChange={handleChange("source")}
                type="text"
                required
                className="form-control"
                value={source}
            />
          </div>

          <button className="btn btn-outline-primary">Create Product</button>
        </div>
      </form>
  );

  const showError = () => (
      <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
  );

  const showSuccess = () => (
      <div
          className="alert alert-info"
          style={{ display: createdProduct ? "" : "none" }}
      >
        <h2>{`${createdProduct}`} is created!</h2>
      </div>
  );

  const showLoading = () =>
      loading && (
          <div className="alert alert-success">
            <h2>Loading...</h2>
          </div>
      );

  return (
      <Layout
          title="Add a new book"
          className="container"
          description={`G'day ${user.name}, ready to add a new book?`}
      >
        <div className="my-5">
          <div align="center" className="container">
            {goBack()}
            {showLoading()}
            {showSuccess()}
            {showError()}
            {newPostForm()}
          </div>
        </div>
      </Layout>
  );
};

export default AddBook;

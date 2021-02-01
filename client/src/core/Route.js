import React, {lazy, Suspense} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import NotFound from "../assets/404.webp";
import PrivateRoute from "../auth/PrivateRoute";
import styled from 'styled-components';
import ScrollToTop from "./ScrollToTop";

export const SpinnerStyle = styled.div`
  .spinner{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -2rem;
    margin-top: -2rem;
  }
`
const Signup = lazy(() => import("../user/Signup"));
const Signin = lazy(() => import("../user/Signin"));
const Home = lazy(() => import("./Home/Home"));
const Shop = lazy(() => import("./AllBooks/allBooks"));
const MyBag = lazy(() => import("./MyBag/myBag"));
const Product = lazy(() => import("./BookDetail"));
const Dashboard = lazy(() => import("../user/UserDashboard"));
const Profile = lazy(() => import("../user/Profile"));
const AdminRoute = lazy(() => import("../auth/AdminRoute"));
const AdminDashboard = lazy(() => import("../admin/AdminDashboard"));
const AddCategory = lazy(() => import("../admin/AddCategory"));
const AddProduct = lazy(() => import("../admin/AddBook"));
const ManageProduct = lazy(() => import("../admin/ManageBook"));
const UpdateProduct = lazy(() => import("../admin/UpdateBook"));

const NoMatchPage = () => {
    return (
        <div id="error">
            <img src={NotFound} alt="404" style={{height: "90vh"}}/>
        </div>
    );
};

const Routes = () => {
    return (
        <BrowserRouter basename="/React">
            <ScrollToTop />
            <Suspense
                fallback={
                    <SpinnerStyle>
                        <div className="spinner">
                                <div className="spinner-border text-primary" style={{width: "4rem", height: "4rem"}} role="status">
                                    <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </SpinnerStyle>
                }
            >
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/allbooks" component={Shop}/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/mybag" component={MyBag}/>
                    <Route path="/product/:productId" component={Product}/>
                    <PrivateRoute path="/user/dashboard" component={Dashboard}/>
                    <PrivateRoute path="/profile/:userId" component={Profile}/>
                    <AdminRoute path="/admin/dashboard" component={AdminDashboard}/>
                    <AdminRoute path="/create/category" component={AddCategory}/>
                    <AdminRoute path="/create/product" component={AddProduct}/>
                    <AdminRoute path="/admin/products" component={ManageProduct}/>
                    <AdminRoute path="/admin/product/update/:productId" component={UpdateProduct}/>

                    <Route component={NoMatchPage}/>
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};

export default Routes;

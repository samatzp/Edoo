import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {NavLink as LLink} from 'react-router-dom';
import logo from '../../assets/edoo3.svg';
import styled from "styled-components";
import {itemTotal} from "../cartHelpers";

const CustomNav = styled.div`
  img {vertical-align: unset;}
  span {margin-left: 5px}
  i {margin-right: 5px}
`;

const CustomButton = styled(LLink)`
  border-radius: 10px;
  background-color: #0056D2;

`;

const Search = styled.div`

  input {
    border-radius: 10px 0px 0px 10px;
    max-width: 190px;
  }

  button {
    border-radius: 0 10px 10px 0;
    background-color: #0056D2;
  }

`;


const Books = () => {

    return (
        <CustomNav>
            <nav className="navbar navbar-expand-lg navbar-light p-0 border-bottom">
                <Link to="/" className="navbar-brand  mr-sm-5 " href="#">
                    <img className="logo " src={logo} alt='logo'/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto m-2">
                        <form className="form-inline my-2 my-lg-0">
                            <CustomButton to="/allbooks" type="button" className="btn btn-primary mr-sm-5">All
                                Books
                            </CustomButton>
                        </form>
                    </ul>
                    <form className="form-inline my-2 my-lg-0 mr-sm-5 m-2">
                        <CustomButton to="/mybag" className="btn btn-primary mr-xl-5 " align="left" href="#">
                            <i className="fa fa-briefcase" aria-hidden="true"></i>
                            MyBag
                            {itemTotal() !== 0 ? (
                                <span className="badge badge-light">
                                      {itemTotal()}
                                 </span>
                            ) : null}
                            <span className="sr-only">unread messages</span>
                        </CustomButton>
                        <a className="nav-link mr-lg-5" href="#"><i className="fa fa-plus" aria-hidden="true"></i>Order
                            a Book</a>
                    </form>
                </div>
            </nav>
        </CustomNav>
    )
        ;
};

export default withRouter(Books);

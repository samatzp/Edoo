import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import ShowImage from "../ShowImage";
import moment from "moment";
import {addItem, removeItem, updateItem} from "../cartHelpers";
import styled from "styled-components";
import { NavLink as LLink } from 'react-router-dom';

const CustomRouter = styled(LLink)`
    
`;

const Card = ({
                  product,
                  removeButton = false,
              }) => {

    const lang = (qu) => {
        if (qu>2) {
            return (
                <span className="badge badge-secondary badge-pill p-2">ENG</span>
            );
        } else if (qu>1){
            return (
                <span className="badge badge-danger badge-pill p-2">RUS</span>
            );
        }else {
            return (
                <span className="badge badge-primary badge-pill p-2">KAZ</span>
            );
        }
    };

    const showCartRemove = () => {
        return (
            removeButton && (
                <button
                    onClick={() => removeItem(product._id)}
                    className="btn btn-outline-dark-green"
                >
                    {" "}
                    <i className="fa fa-trash fa-lg" aria-hidden="true"></i>Remove
                </button>
            )
        );
    };

    //console.log(product);
    return (
            <div className="card">
                <div className="card-body p-2">
                    <CustomRouter to={`/product/${product._id}`}>
                    <ShowImage item={product} url="product"/>
                    <div className="ui top right attached label">
                        {lang(product.lang)}
                    </div>
                    </CustomRouter>
                    <div className="card-header bg-dark text-white text-center text-truncate">{product.name}</div>
                    <p className="black-10 lead text-success text-center">{product.grade} grade</p>
                    {showCartRemove()}
                </div>
            </div>
    );
};

export default Card;

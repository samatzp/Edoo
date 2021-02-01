import React from "react";
import Header from "./Header/Header";
import styled from "styled-components";

const GlobStyle = styled.div`

`;

const Layout = ({
                    title = "",
                    description = "Description",
                    className,
                    children,
                }) => (


    <GlobStyle>
        <div className="container">
            <Header/>
            <div className="jumbotron cloudy-knoxville-gradient mt-1">
                {(<h2>{title}</h2>)}
                <p className="lead mb-2">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    </GlobStyle>
);

export default Layout;

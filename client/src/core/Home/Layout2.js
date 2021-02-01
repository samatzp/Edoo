import React from "react";
import Header from "../Header/Header";
import styled from "styled-components";

const GlobStyle = styled.div`

`;

const Layout = ({
                    className,
                    children,
                }) => (


    <GlobStyle>
        <div className="container">
            <Header/>
            <div className={className}>{children}</div>
        </div>
    </GlobStyle>
);

export default Layout;

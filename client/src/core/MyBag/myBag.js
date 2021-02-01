import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { getCart } from "../cartHelpers";
import Card from "../Card/Card";


const MyBag = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = (items) => {
    return (
      <div>
        <h2>In your Bag has {`${items.length}`} book</h2>
        <hr />
        <div className="row no-guttes">
          {items.map((product, i) => (
            <div key={i} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-2">
              <Card
                removeButton={true}
                cartButton={false}
                cartUpdate={true}
                product={product}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your Bag is empty. <br /> <Link to="/allbooks">collect your study book</Link>
    </h2>
  );

  return (
    <Layout
      title="My Bag"
      description="Manage your books. Add remove or continue reading."
      className="container"
    >
      <div className="my-5">
        <div className="row">
          <div className="col-12 mb-2">
            {items.length > 0 ? showItems(items) : noItemsMessage()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyBag;

import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const params = useParams();
  console.log(params);

  const { id, title, description, price, instock } = params;

  return (
    <>
      <div className="container py-5">
        <h4>This is Fruit Detail Page</h4>
        <h6>Fruit ID: {id}</h6>
        <h6>Fruit Name: {title}</h6>
        <h6>Fruit Description: {description}</h6>
        <h6>Fruit Price: {price}</h6>
        <h6>Fruit Instock: {instock}</h6>
      </div>
    </>
  );
};

export default ProductDetail;

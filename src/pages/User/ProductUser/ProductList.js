import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { getProductActive } from "../../../redux/actions/supplier";
import { Navigate, useNavigate } from "react-router-dom";

// Styled Components
const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  margin: 0 auto;
  max-width: 1200px;
`;

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProductDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
  transition: color 0.3s ease;

  ${ProductCard}:hover & {
    color: #ff6347;
  }
`;

const ProductDescription = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
`;

const ProductPrice = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;

const Divider = styled.span`
  flex-grow: 1;
  border-bottom: 1px solid #ddd;
  margin-left: 10px;
  margin-right: 10px;
`;

const ProductPage = () => {
  const [getProduct,setProduct]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
    getProductActive().then((res)=>{
      setProduct(res.data.data);
    })
  },[]);
  const handleClick=(id)=>{
      navigate("product/"+id);
    
  }
  return (
    <ProductList>
      {getProduct.map((product) => (
        <ProductCard onClick={()=>handleClick(product.product_ID)} key={product.product_ID}>
          <ProductImage src={`${process.env.REACT_APP_BASE_URL}/${product.product_Image}?t=${Date.now()}`} />
          <ProductDetails>
            <ProductName>{product.product_Name}</ProductName>
            {/* <ProductDescription>{product.description}</ProductDescription> */}
          </ProductDetails>
          <Divider />
          <ProductPrice>{product.price}</ProductPrice>
        </ProductCard>
      ))}
    </ProductList>
  );
};

export default ProductPage;

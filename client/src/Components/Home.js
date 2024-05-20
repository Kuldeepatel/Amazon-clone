// Home.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "../axios";
import Navbar from "./Navbar";
import Card from "./Card";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products/get");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/products/search?title=${searchTerm}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  return (
    <Container>
      <Navbar setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
      <Banner autoplay={true} autoplaySpeed={3000}>
      <div>
        <img src="./image1.jpg" alt="" />
      </div>
      <div>
        <img src="./image2.jpg" alt="" />
      </div>
      <div>
        <img src="./banner.jpg" alt="" />
      </div>
    </Banner>
      <Main>
        {products.map((product) => (
          <Card
            key={product._id}
            id={product._id}
            image={product.imageURL}
            price={product.price}
            rating={product.rating}
            title={product.title}
          />
        ))}
      </Main>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  width: 100%;
  background-color: rgb(234, 237, 237);
  max-width: 100%; /* Change from 1400px to 100% */
  margin: 0 auto; /* Ensure margin is set to auto for centering */
  height: fit-content;
  display: flex;
  flex-direction: column;
`;
const Banner = styled(Slider)`
  width: 100%;
  margin-bottom: 20px;

  .slick-slide img {
    width: 100%;
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 2),
      rgba(0, 0, 0, 0.95),
      rgba(0, 0, 0, 0.85),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0)
    );
  }

  @media only screen and (max-width: 767px) {
    .slick-slide:nth-child(1) img {
      display: none;
    }

    .slick-slide:nth-child(2) img {
      display: block;
      -webkit-mask-image: none;
    }
  }
`;

const Main = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;
  width: 100%;

  grid-auto-rows: 420px;
  grid-template-columns: repeat(4, 280px);
  grid-gap: 20px;

  /* Mobile */
  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 50%);
    grid-gap: 0;
  }

  /* Tablets */
  @media only screen and (min-width: 767px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 30%);
  }

  @media only screen and (min-width: 767px) {
    margin-top: -130px;
    padding: 10px 0px;
  }
`;

export default Home;

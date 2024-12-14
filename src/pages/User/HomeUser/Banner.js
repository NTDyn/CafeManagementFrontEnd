import React from 'react';
import styled from 'styled-components';
import Slider from "react-slick"; // Thư viện React Slick
import image1 from "../Image/banner1.png";
import image2 from "../Image/banner1.png";
import image3 from "../Image/banner1.png";

// Styled container for slider
const SliderContainer = styled.div`
  .slick-prev,
  .slick-next {
    z-index: 2;
    font-size: 20px;
  }

  .slick-prev:before,
  .slick-next:before {
    color: #fff;
  }

  .slick-dots li button:before {
    font-size: 12px;
    color: #fff;
  }
`;

const Slide = styled.div`
  display: flex; /* Dùng Flexbox để căn chỉnh */
  align-items: center; /* Căn chỉnh dọc */
  justify-content: flex-start; /* Căn chỉnh nội dung về phía trái */
  position: relative;
  aspect-ratio: ${props => props.aspectRatio || "4/2"};
  background-image: url(${(props) => props.image});
  background-size: cover; /* Đảm bảo ảnh phủ toàn bộ slide */
  background-position: center;
  background-repeat: no-repeat;
  color: white;

  .content {
    position: relative;
    z-index: 2;
    padding: 20px;
    max-width: 50%; /* Giới hạn chiều rộng của nội dung */
    margin-left: 20px; /* Để nội dung không dính vào cạnh */
    background-color: rgba(0, 0, 0, 0.4); /* Màu nền mờ cho nội dung */
  }

  h1 {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    line-height: 1.5;
  }
`;

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        <Slide image={image1}>
          {/* <div className="content">
            <h1>Chúng Tôi Có Coffee & Chocolate</h1>
            <p>
              Mùi thơm sữa béo ngọt ngào, quyến rũ. Hương vị đặc trưng hòa quyện với cà phê. <br />
              Ngoài ra, Cream đặc có đường Brothers còn bổ sung thêm Vitamin B1, B6 rất tốt cho sức khỏe.
            </p>
          </div> */}
        </Slide>
        <Slide image={image2}>
          {/* <div className="content">
            <h1>Hương Vị Đặc Biệt</h1>
            <p>
              Cảm nhận từng giọt cà phê tinh túy hòa quyện với hương thơm tự nhiên của Chocolate.
            </p>
          </div> */}
        </Slide>
        <Slide image={image3}>
          {/* <div className="content">
            <h1>Trải Nghiệm Độc Đáo</h1>
            <p>
              Mang đến một trải nghiệm cà phê đỉnh cao, giúp bạn khơi nguồn cảm hứng mỗi ngày.
            </p>
          </div> */}
        </Slide>
      </Slider>
    </SliderContainer>
  );
};

export default BannerSlider;

import React, { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Slider from 'react-slick';

const ProductImageCarousel = ({ images }) => {
    const sliderRef = useRef(null); // Khai báo ref cho slider

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Tắt các mũi tên mặc định
    };

    // Điều khiển slider với ref
    const goToPrev = () => sliderRef.current.slickPrev();
    const goToNext = () => sliderRef.current.slickNext();

    return (
        <Box sx={{ position: 'relative', margin: 'auto' }}>
            {/* Carousel */}
            <Slider ref={sliderRef} {...settings}>
                {images.map((image, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={image} alt={`product-image-${index}`} style={{ width: '100%', height: 'auto' }} />
                    </Box>
                ))}
            </Slider>

            {/* Mũi tên điều hướng */}
            <IconButton
                sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', zIndex: 1 }}
                onClick={goToPrev}
            >
                <ArrowBack />
            </IconButton>
            <IconButton
                sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', zIndex: 1 }}
                onClick={goToNext}
            >
                <ArrowForward />
            </IconButton>
        </Box>
    );
};

export default ProductImageCarousel;

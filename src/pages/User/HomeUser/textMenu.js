import React from 'react';

const MenuText = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Căn giữa theo chiều ngang
        alignItems: 'center', // Căn giữa theo chiều dọc
      
        fontSize: '48px', // Kích thước chữ lớn
        fontWeight: 'bold', // Độ đậm của chữ
        color: '#A9806A', // Màu chữ
        fontFamily: '"Roboto", sans-serif', // Đổi kiểu chữ
        textTransform: 'uppercase', // Chữ in hoa
        letterSpacing: '2px', // Khoảng cách giữa các chữ
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Đổ bóng chữ
      }}
    >
      Menu
    </div>
  );
};

export default MenuText;

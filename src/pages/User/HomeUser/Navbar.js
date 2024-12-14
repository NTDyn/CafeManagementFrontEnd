import zIndex from '@mui/material/styles/zIndex';
import React from 'react';
import styled from 'styled-components';

const styles = {
  header: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 40px",
    backgroundColor: "#f5f5f5",
    fontSize: "14px",
    zIndex: 1,
    
  },
  logoContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "10px 20px",
    borderRadius: "50%",
    zIndex: 10,
  },
  logo: {
    color: "#A9806A",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
  },
  navbar: {
   display: "flex",
  justifyContent: "center", // Căn giữa các phần tử bên trong theo chiều ngang
  alignItems: "center", // Đảm bảo căn giữa theo chiều dọc
  gap: "20px",
  padding: "20px 0",
  width: "90%",
  backgroundColor: "#000",
  borderRadius: "30px",
  margin: "auto", // 

  },
  navItemLeft: {
    position:"relative",
    right:"150px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    transition: "color 0.3s",
  },
  navItemRight: {
    position:"relative",
    left:"150px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    transition: "color 0.3s",
  },
  navItem: {

    color: "#000",
    textDecoration: "none",
    fontSize: "16px",
    transition: "color 0.3s",
  },
  slider: {
    position: "relative",
    maxWidth: "100%",
    overflow: "hidden",
  },
  slideImage: {
    width: "100%",
    height: "600px",
    objectFit: "cover",
    transition: "opacity 1s ease-in-out", // Thêm hiệu ứng mượt mà
  },
  caption: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
  },
  utilities: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    alignItems: "center",
    fontSize: "16px",
    padding: "5px 20px",
  },
  icon: {
    fontSize: "20px",
    cursor: "pointer",
  },
};

const Navbar = () => {
  return (
    <div>
      {/* Header */}
      <header style={styles.header}>
        {/* Top Bar */}
        {/* <div style={styles.topBar}>
        
          <div>
            <a href="#" style={styles.navItem}>
              Đăng ký
            </a>{" "}
            {" "}
            <a href="#" style={styles.navItem}>
              Đăng nhập
            </a>
          </div>
        </div> */}

        {/* Logo */}
        <div style={styles.logoContainer}>
          <div style={styles.logo}>COFFEE HOUSE</div>
        </div>

        {/* Navbar */}
        <nav style={styles.navbar}>
          <a href="#" style={styles.navItemLeft}>
            Trang chủ
          </a>
          <a href="#" style={styles.navItemLeft}>
            Giới thiệu
          </a>
          <a href="#" style={styles.navItemLeft}>
            Sản phẩm
          </a>
          <a href="#" style={styles.navItemRight}>
            Dịch vụ
          </a>
          <a href="#" style={styles.navItemRight}>
            Tin tức
          </a>
          <a href="#" style={styles.navItemRight}>
            Liên hệ
          </a>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { LoginUser } from "../../../redux/actions/supplier";
import Swal from 'sweetalert2';
import { Button, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserName, setShowUserName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // Đóng modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Kiểm tra trạng thái đăng nhập khi component load
  useEffect(() => {
    const user = sessionStorage.getItem("Account_UserName");
    if (user) {
      setIsLoggedIn(true);
      setShowUserName(user);
    }
  }, []);

  // Xử lý đăng nhập người dùng
  const handleLoginUser = (e) => {
    e.preventDefault();  // Ngăn form reload trang
    if (userName && password) {
      LoginUser(userName, password).then((res) => {
        if (res.data.data != null) {
          Swal.fire("Login Success", "", "success");
          sessionStorage.setItem("Account_UserName", userName);
          setIsLoggedIn(true);
          setShowUserName(userName);
          closeModal();
        } else {
          Swal.fire(res.data.message, "", "error");
        }
      });
    } else {
      Swal.fire("Vui lòng điền đầy đủ thông tin", "", "warning");
    }
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    sessionStorage.removeItem("Account_UserName");
    setIsLoggedIn(false);
    setShowUserName("");
    Swal.fire("Logout Successful", "", "success");
  };

  return (
    <div style={{marginLeft:"80%", padding: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      {!isLoggedIn ? (
        <Button
      variant="contained"
      color="primary"
      startIcon={<LockOutlinedIcon />}
      sx={{
        padding: '12px 30px',
        borderRadius: '30px',
        textTransform: 'none',
        fontSize: '16px',
      }}
      onClick={() => setIsOpen(true)}
    >
      <Typography variant="button">Login</Typography>
    </Button>
      ) : (
        <div>
          <p>Chào mừng, {showUserName}!</p>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Đăng xuất
          </button>
        </div>
      )}

      {/* Modal đăng nhập */}
      {isOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button style={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <h2 style={styles.modalHeader}>Đăng nhập</h2>
            <form onSubmit={handleLoginUser}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="text"
                  name="UserName"
                  placeholder="Nhập UserName"
                  style={styles.input}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <button type="submit" style={styles.submitButton}>
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    width: "400px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#888",
  },
  modalHeader: {
    marginBottom: "20px",
    fontSize: "24px",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default LoginModal;

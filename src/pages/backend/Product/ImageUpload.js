import React, { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';

const UploadProductImage = ({ onUpload, onChange }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);

    // Xử lý chọn tệp
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            if (onChange) {
                onChange(file); // Trả về file ảnh
            }
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result); // Hiển thị hình ảnh xem trước
            };
            reader.readAsDataURL(file);
        }
    };

    // Xử lý upload hình ảnh
    const handleUpload = async () => {
        if (selectedImage) {
            const formData = new FormData();
            formData.append('file', selectedImage);

            try {
                // Mock API request hoặc thay URL và logic này bằng API thực tế
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();

                // Gửi kết quả ra ngoài qua callback nếu cần
                if (onUpload) {
                    onUpload(result);
                }

                alert('Image uploaded successfully!');
            } catch (error) {
                console.error('Upload failed:', error);
                alert('Failed to upload image.');
            }
        } else {
            alert('Please select an image first!');
        }
    };

    // Xử lý xóa hình ảnh
    const handleRemove = () => {
        setSelectedImage(null);
        setPreview(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: 2,
                border: '1px solid #ddd',
                borderRadius: '8px',
                maxWidth: 400,
                margin: 'auto',
            }}
        >
            <Typography variant="h6">Upload Product Image</Typography>

            {/* Hiển thị hình ảnh xem trước */}
            {preview ? (
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 200,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                    }}
                >
                    <img
                        src={preview}
                        alt="Preview"
                        style={{
                            maxHeight: '100%',
                            maxWidth: '100%',
                            objectFit: 'contain',
                        }}
                    />
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(255,255,255,0.8)',
                        }}
                        onClick={handleRemove}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ) : (
                <Typography color="textSecondary">No image selected</Typography>
            )}

            {/* Nút chọn file */}
            <Button
                variant="contained"
                component="label"
                startIcon={<UploadFileIcon />}
            >
                Choose Image
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                />
            </Button>


        </Box>
    );
};

export default UploadProductImage;

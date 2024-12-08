import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';

const UploadProductImage = ({ onChange, onSetBaseURL, initialImage = null }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (initialImage) {
            setPreview(initialImage);
        }
    }, [initialImage]);
    // Xử lý chọn tệp
    const handleFileChange = (event) => {
        console.log('hh')
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            if (onChange) {
                onChange(file); // Trả về file ảnh
            }
            const reader = new FileReader();
            let baseURL = "";
            reader.onload = () => {
                setPreview(reader.result); // Hiển thị hình ảnh xem trước
                if (onSetBaseURL) {
                    baseURL = reader.result;
                    const cleanedBaseURL = baseURL.replace(/^data:image\/\w+;base64,/, '');
                    onSetBaseURL(cleanedBaseURL);  // Pass the baseURL (preview) to the parent
                }
            };
            reader.readAsDataURL(file);
            // handleUpload()
        }
    };




    // Xử lý xóa hình ảnh
    const handleRemove = () => {
        setSelectedImage(null);
        setPreview(null);
        if (onSetBaseURL) {
            onSetBaseURL(null);  // Clear the baseURL when removed
        }
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
                        height: 120,
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

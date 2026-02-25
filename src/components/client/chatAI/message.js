import React from 'react';
import { Box, Typography } from '@mui/material';

const Message = ({ text, isAI }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isAI ? 'flex-start' : 'flex-end',
                my: 1,
                px: 2,
            }}
        >
            <Box
                sx={{
                    bgcolor: isAI ? '#e0e0e0' : '#1976d2',
                    color: isAI ? 'black' : 'white',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    maxWidth: '70%',
                    wordBreak: 'break-word',
                }}
            >
                <Typography variant="body2">{text}</Typography>
            </Box>
        </Box>
    );
};

export default Message;

import { Button } from "@mui/joy";
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Add from '@mui/icons-material/Add';

export default function AddRecipe() {
    const [open, setOpen] = useState(false);
    return (

        <>
            <Button
                variant="outlined"
                color="neutral"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
            >
                Add Recipe Raw
            </Button>

        </>
    )
}
import React from "react";
import {
    Box,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
    Paper,
} from "@mui/material";

const PermissionSelector = ({ dataPermission, selectedPermissions, onChange }) => {
    const handleChange = (event) => {
        const { name, checked } = event.target;

        if (checked) {
            const alreadyExists = selectedPermissions.some(p => p.permission_ID === name);
            const newSelected = alreadyExists
                ? selectedPermissions
                : [...selectedPermissions, { permission_ID: name }];

            onChange(newSelected);
        } else {
            const newSelected = selectedPermissions.filter(p => p.permission_ID !== name);
            onChange(newSelected);
        }
    };



    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Assign Permissions to Employee
            </Typography>
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    {dataPermission?.map((permission) => (
                        <FormControlLabel
                            key={permission.permission_ID}
                            control={
                                <Checkbox
                                    checked={selectedPermissions.some(item => item.permission_ID === permission.permission_ID.toString())}
                                    onChange={handleChange}
                                    name={permission.permission_ID.toString()}
                                />

                            }
                            label={permission.permission_Name}
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </Paper>
    );
};

export default PermissionSelector;

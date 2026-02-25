import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMenu } from "../../../redux/actions/menu";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MenuSelector = ({ dataMenu }) => {

  const dispatch = useDispatch();
  const activeMenus = dataMenu?.filter(menu => menu.isActive) || [];
  const mainMenu = activeMenus.find(menu => menu.isSelected) || {};
  const [selectedID, setSelectedID] = useState(mainMenu?.menu_ID || "")

  const setUpMainMenu = (newID) => {
    dispatch(setSelectedMenu(newID));
  }

  const handleChange = (event) => {
    const newID = event.target.value;
    withReactContent(Swal).fire({
      title: "Do you want to set new main menu?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedID(newID);
        setUpMainMenu(newID)
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };


  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth size="small" sx={{ border: '0.1rem solid #cdd7e1', borderRadius: '5px ' }}>
        <InputLabel id="menu-select-label">Menu Chính</InputLabel>
        <Select
          labelId="menu-select-label"
          id="menu-select"
          value={activeMenus.some(menu => menu.menu_ID === selectedID) ? selectedID : ""}
          label="Chọn Menu"
          onChange={handleChange}
        >
          {activeMenus?.map((menu) => (
            <MenuItem key={menu.menu_ID} value={menu.menu_ID}>
              {menu.menu_Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

  );
};

export default MenuSelector;

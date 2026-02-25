import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function OptionSelector({ title, options, multiple, onSelect }) {
    const [selected, setSelected] = useState(null);

    const handleSelect = (event, newSelection) => {
        if (multiple) {
            setSelected(newSelection);
            onSelect(newSelection.map((id) => options.find((opt) => opt.forcedChoice.choice_ID === id)));
        } else {
            if (newSelection !== null) {
                setSelected(newSelection);
                onSelect(options.find((opt) => opt.forcedChoice.choice_ID === newSelection));
            }
        }
    };

    return (
        <div style={{ marginBottom: "16px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "8px", fontSize: '20px' }}>{title}</p>
            <ToggleButtonGroup
                value={selected}
                exclusive={!multiple}
                onChange={handleSelect}
                aria-label={title}
                sx={{ flexWrap: "wrap", gap: "8px" }}
            >
                {options.map((option) => (
                    <ToggleButton
                        key={option.forcedChoice.choice_ID}
                        value={option.forcedChoice.choice_ID}
                        sx={{
                            textTransform: "none",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            fontSize: "14px",
                            "&.Mui-selected": {
                                backgroundColor: multiple ? "#f5f5f5" : "orange",
                                color: multiple ? "black" : "white",
                                "&:hover": { backgroundColor: multiple ? "#e0e0e0" : "#d97706" },
                            },
                        }}
                    >
                        {option.forcedChoice.title}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </div>
    );
}

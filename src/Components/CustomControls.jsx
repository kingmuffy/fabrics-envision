/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import {
  TextField,
  Box,
  Slider,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

// Custom Text Input
const CustomTextInput = ({ label, value, onChange }) => (
  <TextField
    fullWidth
    label={label}
    value={value}
    onChange={onChange}
    margin="dense"
  />
);

// Custom File Input
const CustomFileInput = forwardRef(
  ({ label, name, file, onFileChange, onRemoveFile }, ref) => (
    <Box mt={1}>
      <Typography variant="body1">{label}</Typography>
      <Box display="flex" alignItems="center" mt={1}>
        <Button variant="contained" component="label" sx={{ mr: 1 }}>
          Choose File
          <input
            type="file"
            name={name}
            onChange={onFileChange}
            hidden
            ref={ref}
          />
        </Button>
        {file && (
          <Box display="flex" alignItems="center">
            <img
              src={URL.createObjectURL(file)}
              alt={`${name} thumbnail`}
              width={30}
              height={30}
              style={{ marginRight: 10 }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {file.name}
            </Typography>
            <IconButton color="secondary" onClick={() => onRemoveFile(name)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  )
);

// Custom Slider
const CustomSlider = ({ label, value, onChange, min, max, step }) => (
  <Box mt={1} sx={{ width: "100%" }}>
    <Typography gutterBottom>{label}</Typography>
    <Slider
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e, newValue) => onChange(newValue)}
      valueLabelDisplay="auto"
      color="primary"
    />
  </Box>
);

// Custom Select
const CustomSelect = ({ label, value, onChange, options }) => (
  <Box mt={1} sx={{ width: "100%" }}>
    <FormControl fullWidth margin="dense">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        color="primary"
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

export { CustomTextInput, CustomFileInput, CustomSlider, CustomSelect };

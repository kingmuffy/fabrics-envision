/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Button,
  Chip,
  ThemeProvider,
  createTheme,
  TextField,
  Tabs,
  Tab,
  Typography,
  Snackbar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import FabricPreview from "./FabricPreview";
import { CustomFileInput, CustomSlider, CustomSelect } from "./CustomControls";

const theme = createTheme({
  palette: {
    primary: { main: "#40E0D0" },
    secondary: { main: "#008080" },
  },
  typography: { fontFamily: "Avenir" },
});

const FabricUpload = () => {
  const [fabricName, setFabricName] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [fabricColor, setFabricColor] = useState("");
  const [maps, setMaps] = useState({
    diffuse: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    reflection: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    glossiness: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    refraction: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    opacity: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    bump: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    displace: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    selfIllumination: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    diffRough: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    fresnelIOR: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    metalness: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    anisotropy: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    anRotation: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    strTailFalloff: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    IOR: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    translucent: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    translucentAmount: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    fogColor: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    fogDepth: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    coatAmount: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    coatGlossiness: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    coatIOR: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    coatColor: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    coatBump: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    thinFilmThickness: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    thinFilmIOR: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    sheenColor: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    sheenGlossiness: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    environment: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
    normal: { file: null, scale: 1, intensity: 1, tiling: "repeat" },
  });

  const [loading, setLoading] = useState(true);
  const fileInputRefs = useRef({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setMaps((prevMaps) => ({
      ...prevMaps,
      [name]: { ...prevMaps[name], file: files[0] },
    }));
  };

  const handleRemoveFile = (mapKey) => {
    setMaps((prevMaps) => ({
      ...prevMaps,
      [mapKey]: { ...prevMaps[mapKey], file: null },
    }));
    if (fileInputRefs.current[mapKey]) {
      fileInputRefs.current[mapKey].value = "";
    }
  };

  const handleSettingChange = (value, mapKey, setting) => {
    setMaps((prevMaps) => ({
      ...prevMaps,
      [mapKey]: { ...prevMaps[mapKey], [setting]: value },
    }));
  };

  const handleSliderChange = (newValue, mapKey, setting) => {
    setMaps((prevMaps) => ({
      ...prevMaps,
      [mapKey]: { ...prevMaps[mapKey], [setting]: newValue },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fabricName", fabricName);
    formData.append("fabricType", fabricType);
    formData.append("fabricColor", fabricColor);
    Object.keys(maps).forEach((map) => {
      if (maps[map].file) {
        formData.append("files", maps[map].file, `${map}_file`);
        formData.append(`${map}_scale`, maps[map].scale);
        formData.append(`${map}_intensity`, maps[map].intensity);
        formData.append(`${map}_tiling`, maps[map].tiling);
      }
    });

    try {
      setSnackbarMessage("Fabric uploaded successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error uploading fabric:", error);
      setSnackbarMessage("Error uploading fabric");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const mapSections = {
    "Base Maps": [
      "diffuse",
      "reflection",
      "glossiness",
      "refraction",
      "opacity",
    ],
    "Displacement Maps": ["bump", "displace"],
    "Special Effects": ["selfIllumination", "diffRough", "fresnelIOR"],
    BRDF: ["metalness", "anisotropy", "anRotation", "strTailFalloff", "IOR"],
    "Translucency and Fog": [
      "translucent",
      "translucentAmount",
      "fogColor",
      "fogDepth",
    ],
    Coating: [
      "coatAmount",
      "coatGlossiness",
      "coatIOR",
      "coatColor",
      "coatBump",
    ],
    "Thin Film": ["thinFilmThickness", "thinFilmIOR"],
    Sheen: ["sheenColor", "sheenGlossiness"],
    Environment: ["environment"],
    "Normal Map": ["normal"],
  };

  const [selectedSection, setSelectedSection] = useState("Base Maps");
  const [selectedMap, setSelectedMap] = useState("diffuse");

  const handleTagClick = (section) => {
    setSelectedSection(section);
    setSelectedMap(mapSections[section][0]);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedMap(newValue);
  };

  // if (loading) {
  //   return (
  //     <ThemeProvider theme={theme}>
  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: "100vh",
  //           backgroundColor: "#fffff",
  //         }}
  //       >
  //         <Typography variant="h5" component="h1" color="primary">
  //           Envision Loading...
  //         </Typography>
  //       </Box>
  //     </ThemeProvider>
  //   );
  // }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100vh", margin: 0 }}>
        <Box
          sx={{
            width: "20%",
            padding: 2,
            backgroundColor: "#333",
            color: "white",
            borderRight: "1px solid #444",
            margin: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Uploaded Maps
          </Typography>
          <List>
            {Object.keys(maps).map((mapKey) => {
              if (maps[mapKey].file) {
                return (
                  <ListItem
                    key={mapKey}
                    sx={{ borderBottom: "1px solid #444" }}
                  >
                    <img
                      src={URL.createObjectURL(maps[mapKey].file)}
                      alt={`${mapKey} thumbnail`}
                      width={30}
                      height={30}
                      style={{ marginRight: 10 }}
                    />
                    <ListItemText
                      primary={mapKey.charAt(0).toUpperCase() + mapKey.slice(1)}
                    />
                  </ListItem>
                );
              }
              return null;
            })}
          </List>
        </Box>

        <Box
          sx={{
            width: "50%",
            px: 1,
            py: 1.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h1">
            Fabric Upload
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              label="Fabric Name"
              value={fabricName}
              onChange={(e) => setFabricName(e.target.value)}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Fabric Type"
              value={fabricType}
              onChange={(e) => setFabricType(e.target.value)}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Fabric Color"
              value={fabricColor}
              onChange={(e) => setFabricColor(e.target.value)}
              fullWidth
              margin="dense"
            />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
              {Object.keys(mapSections).map((section) => (
                <Chip
                  label={section}
                  key={section}
                  onClick={() => handleTagClick(section)}
                  variant={selectedSection === section ? "filled" : "outlined"}
                  color={selectedSection === section ? "primary" : "default"}
                  clickable
                />
              ))}
            </Box>
            <Tabs
              value={selectedMap}
              onChange={handleTabChange}
              aria-label="map tabs"
              sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}
            >
              {mapSections[selectedSection].map((mapKey) => (
                <Tab
                  key={mapKey}
                  label={mapKey.charAt(0).toUpperCase() + mapKey.slice(1)}
                  value={mapKey}
                />
              ))}
            </Tabs>
            {mapSections[selectedSection].map((mapKey) => (
              <Box
                key={mapKey}
                role="tabpanel"
                hidden={selectedMap !== mapKey}
                id={`tabpanel-${mapKey}`}
                aria-labelledby={`tab-${mapKey}`}
              >
                <Box p={1}>
                  <CustomFileInput
                    ref={(el) => (fileInputRefs.current[mapKey] = el)}
                    label={`${
                      mapKey.charAt(0).toUpperCase() + mapKey.slice(1)
                    } Map`}
                    name={mapKey}
                    file={maps[mapKey].file}
                    onFileChange={handleFileChange}
                    onRemoveFile={handleRemoveFile}
                  />
                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <CustomSlider
                      label="Scale"
                      value={maps[mapKey].scale}
                      onChange={(newValue) =>
                        handleSliderChange(newValue, mapKey, "scale")
                      }
                      min={0.1}
                      max={10}
                      step={0.1}
                    />
                    <CustomSlider
                      label="Intensity"
                      value={maps[mapKey].intensity}
                      onChange={(newValue) =>
                        handleSliderChange(newValue, mapKey, "intensity")
                      }
                      min={0.1}
                      max={10}
                      step={0.1}
                    />
                    <CustomSelect
                      label="Tiling"
                      value={maps[mapKey].tiling}
                      onChange={(value) =>
                        handleSettingChange(value, mapKey, "tiling")
                      }
                      options={[
                        { value: "repeat", label: "Repeat" },
                        { value: "mirror", label: "Mirror" },
                        { value: "clamp", label: "Clamp" },
                      ]}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
            <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
              <Button type="submit" variant="contained" color="primary">
                Upload Fabric
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "30%",
            padding: 2,
            backgroundColor: "#ffffff",
            borderLeft: "1px solid #ddd",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" component="h1" gutterBottom>
            Fabric Preview
          </Typography>
          {/* <FabricPreview maps={maps} /> */}
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
};

export default FabricUpload;

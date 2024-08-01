/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const FabricSidebar = ({ maps }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Uploaded Maps
      </Typography>
      {Object.keys(maps).map(
        (mapKey) =>
          maps[mapKey].file && (
            <Box
              key={mapKey}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <Avatar
                variant="square"
                src={URL.createObjectURL(maps[mapKey].file)}
                alt={mapKey}
                sx={{ width: 36, height: 36 }}
              />
              <Typography variant="body1">
                {mapKey.charAt(0).toUpperCase() + mapKey.slice(1)}
              </Typography>
            </Box>
          )
      )}
    </Box>
  );
};

export default FabricSidebar;

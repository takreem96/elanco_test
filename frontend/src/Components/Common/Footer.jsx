import { Box, Container } from "@mui/material";
import { Link } from "@mui/material";
import { Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <div>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          bgcolor: "#f9f9f9", // Add a background color
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
        }}
      >
        <hr
          style={{
            border: 0,
            height: 1,
            background: "#e0e0e0", // Change the color of the hr element
            margin: 0,
          }}
        />
        <Container
          maxWidth="xl"
          sx={{
            px: 4,
            py: 2,
            overflow: "hidden",
            "& .MuiTypography-root": {
              color: "gray.500",
              "&:hover": { color: "gray.900" },
            },
          }}
        >
          <Typography variant="body2" color="gray.400" align="center">
            © 2023 company name, Inc. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </div>
  );
}

export default Footer;

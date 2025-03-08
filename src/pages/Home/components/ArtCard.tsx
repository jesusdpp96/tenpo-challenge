import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import {
  Schedule as ScheduleIcon,
  Place as PlaceIcon,
  Palette as PaletteIcon,
} from "@mui/icons-material";
import { Artwork } from "../../../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ArtCard: React.FC<{ data: Artwork; counter: number }> = ({
  data,
  counter,
}) => {
  const {
    title,
    artistDisplay,
    dateDisplay,
    placeOfOrigin,
    imageId,
    mediumDisplay,
    departmentTitle,
  } = data;

  // Format artist display by removing line breaks and "Possibly manufactured by"
  const formattedArtist =
    artistDisplay
      ?.replace(/\n/g, " ")
      ?.replace("Possibly manufactured by ", "")
      ?.split(" (")[0] || "Unknown Artist";

  const artCounter = `#${counter}`;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={`https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <Chip
          label={
            departmentTitle?.length > 20
              ? departmentTitle?.slice(0, 20) + "..."
              : departmentTitle
          }
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: "text.primary",
          }}
          size="small"
        />
        <Chip
          label={artCounter}
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "rgba(66, 194, 104, 0.4)",
            color: "text.primary",
          }}
          size="small"
        />
      </Box>

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1.5 }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontSize: "1.1rem",
            fontWeight: 600,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.2,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PaletteIcon sx={{ fontSize: 20, color: "text.secondary" }} />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {formattedArtist}
            </Typography>
          </Box>

          {dateDisplay && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ScheduleIcon sx={{ fontSize: 20, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {dateDisplay}
              </Typography>
            </Box>
          )}

          {placeOfOrigin && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PlaceIcon sx={{ fontSize: 20, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {placeOfOrigin}
              </Typography>
            </Box>
          )}
        </Box>

        {mediumDisplay && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: "auto",
              pt: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {mediumDisplay}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

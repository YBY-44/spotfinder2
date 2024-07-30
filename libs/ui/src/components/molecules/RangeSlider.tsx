import Slider, { SliderProps } from "@mui/material/Slider";
import { SxProps, Theme } from "@mui/material/styles";

export const RangeSlider = (props: SliderProps) => (
  <div className="w-full pt-6 pl-2 pr-4">
    <Slider
      valueLabelDisplay="on"
      sx={{
        height: "2px", // Slider rail height
        width: "100%", // Full width
        "& .MuiSlider-thumb": {
          borderRadius: 0, // Remove rounded corners
          width: 16, // Slider thumb width
          height: 16, // Slider thumb height
          backgroundColor: "white", // Slider thumb background color
          border: "1px solid black", // Slider thumb border color
          "&:hover": {
            boxShadow: "none",
            borderColor: "black",
            backgroundColor: "gray.50", // Slider thumb hover background color
          },
          "&:focus": {
            backgroundColor: "gray.50", // Slider thumb focus background color
          },
        },
        "& .MuiSlider-track": {
          backgroundColor: "red", // Slider track color
          Color: "black", // Slider track color
          height: "2px", // Slider track height
        },
        "& .MuiSlider-rail": {
          backgroundColor: "black", // Slider rail color
          height: "2px", // Slider rail height
        },
        "& .MuiSlider-valueLabel": {
          color: "black", // Value label text color
          backgroundColor: "white", // Value label background color
          borderRadius: 0, // Remove rounded corners
          padding: "2px 4px", // Value label padding
          fontSize: "0.75rem", // Value label font size
          height: "auto", // Ensure height adjusts to content
          width: "auto", // Ensure width adjusts to content
        },
      }}
      {...props}
    />
  </div>
);

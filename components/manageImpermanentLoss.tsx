import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function ManageImpermanentLoss(props) {
  const { user, setUser, balance, setBalance, threshold, setThreshold } =
    useContext(UserContext);

  const position_id = props.position_id;

  const [val, setVal] = useState(0);

  const setThresholdVal = async () => {
    await setThreshold({
      position_id: position_id,
      threshold: val,
    });
  };
  const handleSliderChange = async (event: Event, newValue: number) => {
    await setVal(newValue);
  };

  return (
    <div>
      <Box marginTop={"10px"}>
        <Slider
          defaultValue={70}
          value={val}
          onChange={handleSliderChange}
          aria-label="Small"
          valueLabelDisplay="auto"
          min={-100}
          max={100}
        />
      </Box>
      <Button
        size="large"
        variant="contained"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "60px",
          width: "400px",
          marginTop: "20px",
        }}
        onClick={setThresholdVal}
      >
        Set Threshold
      </Button>
    </div>
  );
}

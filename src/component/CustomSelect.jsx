import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "styled-components";
import { GiBloodyStash } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGroups } from "../store/slices/bloodGroupSlice";

const CustomSelect = () => {
  const [Group, setGroup] = React.useState("");
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  const store = useSelector((store) => store);
  const { bloodGroups } = store.bloodGroup;
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setGroup(event.target.value);
    dispatch(setSelectedGroups(event.target.value));
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="bloodGroup">
        <GiBloodyStash className="cursor-pointer text-primary-main" />
      </label>
      <FormControl
        required={true}
        variant="standard"
        sx={{ width: "100%", bgcolor: "white", px: 1.5 }}
      >
        <InputLabel id="bloodGroup" sx={{ px: 1 }}>
          Blood Group
        </InputLabel>
        <Select
          labelId="bloodGroup"
          id="bloodGroup"
          value={Group}
          onChange={handleChange}
          label="Blood Group"
        >
          {bloodGroups.map(({ bloodGroup, value }, ind) => {
            return (
              <MenuItem key={ind} value={value}>
                {bloodGroup}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export { CustomSelect };

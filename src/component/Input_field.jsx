// import PropTypes from 'prop-types'
import { Input, InputAdornment, TextField } from "@mui/material";
import React from "react";

export const Input_field = (props) => {
  const { val, type, placeholder, id, label, classname, startAdornment } =
    props;
  return (
    <>
      <div className="flex w-full my-2 items-center space-x-1">
        <label className="font-black xl:text-xl cursor-pointer" htmlFor={id}>
          {startAdornment}
        </label>
        <TextField
          variant="outlined"
          type={type}
          required={true}
          value={val}
          placeholder={`${placeholder}`}
          size="small"
          id={id}
          label={label}
          onChange={(e) => props.input_value(e.target.value, e.target.id)}
          className={`pl-1 w-full text-center rounded-lg border border-black bg-white hover:bg-secondary-main ${classname}`}
        />
      </div>
    </>
  );
};

{
  /* <input type="text" value={props.val} className={`${props.class} xl:w-1/4 min-xl:w-2/4 rounded border border-black bg-purple-100 hover:bg-white`}
    id={props.id} placeholder={`${props.placeholder}`} /> */
}

// Input_field.propTypes = {
//   second: PropTypes.third
// }

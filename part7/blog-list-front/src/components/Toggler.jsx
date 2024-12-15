import { forwardRef, useImperativeHandle, useState } from "react";
import propTypes from "prop-types";
import { Button } from "@mui/material";
const Toggler = forwardRef((props, refs) => {
  const [visible, setVisiblity] = useState(false);
  const { buttonLable, children } = props;
  const visibleWhenVisible = { display: visible ? "" : "none" };
  const visibleWhenNotVisible = { display: visible ? "none" : "" };

  const flipVisibility = () => {
    setVisiblity(!visible);
  };
  useImperativeHandle(refs, () => {
    return { flipVisibility };
  });

  return (
    <>
      <Button
        variant="contained"
        style={visibleWhenNotVisible}
        onClick={flipVisibility}
      >
        {buttonLable}
      </Button>
      <div style={visibleWhenVisible}>
        {children}
        <Button variant="outlined" onClick={flipVisibility}>
          cancle
        </Button>
      </div>
    </>
  );
});

Toggler.propTypes = {
  buttonLable: propTypes.string.isRequired,
};

Toggler.displayName = "Toggler";

export default Toggler;

import React from "react";
import { connect } from "react-redux";
import { changeTabAction } from "./store/actions";

function Footer(props) {
  const handleTabs = tabs => {
    props.dispatch(changeTabAction(tabs));
  };

  return (
    <>
      <button onClick={() => handleTabs("all")}>All</button>
      <button onClick={() => handleTabs("active")}>Active</button>
      <button onClick={() => handleTabs("completed")}>Completed</button>
    </>
  );
}

function toProps(store) {
  return store;
}

export default connect(toProps)(Footer);

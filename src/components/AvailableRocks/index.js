import React from "react";
import AvailableRockCard from "../AvailableRockCard";
import PropTypes from "prop-types";

export const AvailableRocks = ({ availableRocks }) => {
  const rockRows = availableRocks.map((rock) => {
    return <AvailableRockCard rock={rock} key={rock.id}/>;
  });

  return <div className="Rocks">{rockRows}</div>;
};

AvailableRocks.propTypes = {
  availableRocks: PropTypes.array,
};

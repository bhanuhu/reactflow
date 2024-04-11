import React from "react";
import { Handle } from "react-flow-renderer";

// Custom Node Component
const SpecialNode = ({ data, isConnectable }) => {
  return (
    <div className="special-node">
      <Handle type="source" position="right" isConnectable={isConnectable} />
      {data.label}
      <Handle type="target" position="left" isConnectable={isConnectable} />
    </div>
  );
};

// Custom Edge Component
const SpecialEdge = ({ data, source, target }) => {
  return (
    <div className="special-edge">
      <p>{source} ➡️ {target}</p>
      {data.label && <p>{data.label}</p>}
    </div>
  );
};

export { SpecialNode, SpecialEdge };
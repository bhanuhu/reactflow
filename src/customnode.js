import React from 'react';
import { Handle } from 'react-flow-renderer';

const CustomNode = ({ data, isConnectable, sourcePosition, targetPosition, id }) => {
  return (
    <div style={{ position: 'relative', width: '120px', height: '60px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '5px' }}>
      <Handle type="target" position={targetPosition} />
      <div style={{ padding: '10px' }}>
        <span>{data.label}</span>
        <div style={{ position: 'absolute', top: '0', right: '0', display: 'none' }} id={`actions-${id}`}>
          <button onClick={() => console.log('Delete')}>Delete</button>
          <button onClick={() => console.log('Update')}>Update</button>
        </div>
      </div>
      <Handle type="source" position={sourcePosition} isConnectable={isConnectable} />
    </div>
  );
};

export default CustomNode;

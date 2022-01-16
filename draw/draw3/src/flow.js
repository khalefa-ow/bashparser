

import React, {useState} from 'react';
import ReactFlow from 'react-flow-renderer/nocss';
import 'react-flow-renderer/dist/style.css';
import 'react-flow-renderer/dist/theme-default.css';

import ProcessFile from './process.js';

const FlowA =() => {

    const [instance, setInstance] = useState();
  const onLoad = (reactFlowInstance) => {
  setInstance(reactFlowInstance);
  reactFlowInstance.fitView();
};
const [elements, setElements]=useState(
[
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  // default node
  {
  id: '2',
      // you can also pass a React component as a label
      data: {
        label: <div>Default Node <
            /div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
]);


const OnProcessFile =() => {
  const x={
    id: '4',
    type: 'output',
    data: { label: 'Output Node 2' },
    position: { x: 120, y: 250 },
  };
  console.log('a');
  setElements((prev) => {
        return [...prev, x];
      });

};
//const elements = ProcessFile.getElements();

  return (<div style = {
      {
        height: 500
      }
    }>
    <ReactFlow elements = {
      elements}
       onLoad={onLoad}
     />

    <button type="button" onClick={OnProcessFile}>
          Process File
        </button>

  </div>);
};

export default FlowA;

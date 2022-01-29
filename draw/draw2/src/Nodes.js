
/*---*/
import './nodestyles.css';

import React from 'react';
import {Handle} from 'react-flow-renderer';

const CommandNode = ({data}) => {
  return (<div className = 'command-node'>

 <Handle
  type = 'target'
  id={`${data.id}.top`}
  position =
      'top'
      />

      <div id = {data.id}>{data.label}<
          /div >
          <Handle
  type = 'source'
  id={`${data.id}.bottom`}
  position = 'bottom'
   />

      </div>);
};



const CircleNode = ({data}) => {
  return (
    <div
  className="endif-node"
   >
  <
      Handle
  type = 'target'
  position = 'bottom'
  id = {`${data.id}.bottom`}
  className= "handlestyle" />

      <div id = {data.id}>{data.label}<
          /div > < Handle
  type = 'source'
  position = 'right'
  id = {`${data.id}.right`} style =
  {
    { top: '30%', borderRadius: 0 }
  } /><
      Handle
  type = 'source'
  position = 'left'
        id={`${data.id}.left`}
        style={
    { top: '70%', borderRadius: 0 }}
      / >
      </div>
  );
};

const IfNode = ({data}) => {
  return (
    <div className='if-node'>
      <Handle
        type='target'
        id={`${data.id}.top`}
        className= "handlestyle" />
      <div id = {data.id} className="if-node-label">{data.label}<
          /div>
      <Handle
        type='source'
        id={`${data.id}.then`}
          className= "handlestyle"
            position='left'
      /><
      Handle
  type = 'source'
        id={`${data.id}.else`}
          className= "handlestyle"
            position = 'right'
      />
    </div>
  );
};

export const TextNode = ({data}) => {
  return (<div style = {
    {
      background: 'transparent', padding: '14px'
    }
  }><div id = {data.id}>{data.label}</div>
    </div>);
};

export const nodeTypes = {
  circle: CircleNode,
  cmnd: CommandNode,

  text: TextNode,
  diamond: IfNode
};

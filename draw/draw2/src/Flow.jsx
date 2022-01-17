//https://www.pluralsight.com/guides/uploading-files-with-reactjs
//https://stackoverflow.com/questions/39695275/react-js-handling-file-upload
//https://stackoverflow.com/questions/31758081/loading-json-data-from-local-file-into-react-js

import React, {useState, useEffect } from "react";

import ReactFlow, {removeElements, updateEdge, addEdge, Background, MiniMap, Controls } from "react-flow-renderer";
import raw from 'raw.macro';
//import * as fs from 'fs';

import rawdata from './terad-output.json';

const ReactFlowRenderer = () => {
  const[elements, setElements] = useState([]);
  const[count, setCount] = useState(0);
  const[name, setName] = useState("");
  const[activeNode, setActiveNode] = useState();
  const[newName, setNewName] = useState("");
  const[instance, setInstance] = useState();

  useEffect(() =>
                 {
                   if (activeNode) setNewName(activeNode.data.label);
                 },
            [activeNode]);

  const elementRemoveHandler = (elementTobeRemoved) => {
    setElements((prev) => removeElements(elementTobeRemoved, prev));
  };

  const connectHandler = (params) => {
    setElements((prev) => addEdge(params, prev));
  };

  const addRectangleHandler = () => {
    setCount(count + 1);
    const newNode = {
      id : `${count}`,
      data : {label : `${count}` },
      type : "default",
      position : {x : 0, y : 0}
    };
    newNode.data = {... newNode.data, id : `${newNode.id}` };

    setElements((prev) => { return [... prev, newNode ]; });
    setName("");
  };

   const add1 = (ht, n, v) => {
    n++;

    ht[n] = v;
    console.log(n+":"+ v);
    return n;
  };

  const traverse = (ht, n, o)=>{
    //var l = func.apply(this, [ ht, n, o ]);
    add1(ht,n,o);
    console.log('------');

    if (Array.isArray(o)) {
      for (var i = 0; i < o.length; i++) {
        var v = o[i];
        this.traverse(v);
      }
    } else if (typeof(o) == 'object') {
      var type = o['type'];
      if (type === 'Script' || type === 'CompoundList' ||
                                          type === 'Pipeline')
        this.traverse(o['commands']);
      else if (type === 'If') {
        // then

        // else
      } else if (type === 'Command');
      //  func.apply(this, [o]);
    }
  };

  const LoadHandler = () => {
    var ht = {};
    var n = 0;
        // const rawdata = raw('./terad-output.json');
    //var rawdata = fs.readFileSync('terad-output.json');
    var jsondata = JSON.parse(rawdata);
    traverse(jsondata);

    for (var x in ht) {
      var m = {};
      m['id'] = n++;
      m['data'] = x;

      console.log(m);
    }
    /* setCount(0);
     var nodes = ProcessFile.getElements();
     for (var n in nodes) {
       const newNode = {
         id : `${count}`,
         data : {label : `${count}` },
         type : "default",
         position : {x : 0, y : 0}
       };
       newNode.data = {... newNode.data, id : `${newNode.id}` };

       setElements((prev) = > { return [... prev, newNode ]; });
       setName("");
     }*/
  };
  const addCircleHandler = () => {
    const newNode = {
      id : `${Date.now()}`,
      data : {label : `${name}` },
      type : "circle",
      position : {x : 0, y : 0}
    };
    newNode.data = {... newNode.data, id : `${newNode.id}` };

    setElements((prev) => { return [... prev, newNode ]; });
    setName("");
  };

  const addTriangleHandler = () => {
    const newNode = {
      id : `${Date.now()}`,
      data : {label : `${name}` },
      type : "triangle",
      position : {x : 0, y : 0}
    };
    newNode.data = {... newNode.data, id : `${newNode.id}` };

    setElements((prev) => { return [... prev, newNode ]; });
    setName("");
  };

  const addTextHandler = () => {
    const newNode = {
      id : `${Date.now()}`,
      data : {label : `${name}` },
      type : "text",
      position : {x : 0, y : 0}
    };
    newNode.data = {... newNode.data, id : `${newNode.id}` };

    setElements((prev) => { return [... prev, newNode ]; });
    setName("");
  };

  const edgeUpdateHandler = (oldEdge, newConnection) =>
       setElements((els) => updateEdge(oldEdge, newConnection, els));

  const clickHandler = (e) => {
    var htmlString = e.target.outerHTML.toString();
    var index = htmlString.indexOf(` id="`);
    index += 5;
    const currentId = htmlString.substr(index, 13);

    elements.forEach((_current) => {
      if (_current.id === currentId) {
        setActiveNode(_current);
      }
    });
    // setNewName(activeNode.data.label)
  };

  const updateNodeHandler = () => {
    if (!activeNode) return;
    setElements(elements.map((_current) => {
      if (_current.id === activeNode.id) {
        return {... _current, data : {label : newName, id : _current.data.id}};
      }

      return _current;
    }));
  };

  const onLoad = (reactFlowInstance) => {
    setInstance(reactFlowInstance);
    reactFlowInstance.fitView();
  };

  const saveChangesHandler = () => {
    console.log("current state", instance.getElements());
  };

  return (
      <div style = {{
         height : "75vh",
         width : "75vw",
         border : "1px solid black",
         marginLeft : "12.5vw"
       }}>
      <ReactFlow elements = {elements} onElementsRemove =
           {elementRemoveHandler} onConnect = {connectHandler} deleteKeyCode =
               {8 || 46} onEdgeUpdate = {edgeUpdateHandler}

       snapToGrid = {true} snapGrid = {[16, 16]} connectionLineStyle =
       {
         {
         stroke:
           "black", strokeWidth : 2
         }
       } onDoubleClick = {clickHandler} onLoad = {onLoad}>

      <Controls /></ ReactFlow>

      <div>

      <button type = "button" onClick = {addRectangleHandler}>
          Add</ button><button type = "button" onClick = {LoadHandler}>
              Load</ button>
      <button type = "button" onClick = {saveChangesHandler}>
          Save changes</ button>

      </ div>

      </ div>);
};

export default ReactFlowRenderer;

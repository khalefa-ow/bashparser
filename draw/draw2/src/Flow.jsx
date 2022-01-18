//https://www.pluralsight.com/guides/uploading-files-with-reactjs
//https://stackoverflow.com/questions/39695275/react-js-handling-file-upload
//https://stackoverflow.com/questions/31758081/loading-json-data-from-local-file-into-react-js

import React, {useState, useEffect } from "react";

import ReactFlow, {removeElements, updateEdge, addEdge, Background, MiniMap, Controls } from "react-flow-renderer";

import { nodeTypes } from "./Nodes";
//import raw from 'raw.macro';
//import * as fs from 'fs';
//import rawdata from './terad-output.json';

const ReactFlowRenderer = () => {
  var[elements, setElements] = useState([]);
  const[count, setCount] = useState(0);
  const[name, setName] = useState("");
  const[activeNode, setActiveNode] = useState();
  const[newName, setNewName] = useState("");
  const[instance, setInstance] = useState();

  var n=0;

  const getData=()=>{
    fetch('terad-output.json'
    ,{
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
      //  console.log(response)
        return response.json();
      })
      .then(function(myJson) {
console.log(myJson);
        traverse(myJson,-1);

      //  setData(myJson)
      });
  }

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

  var addRectangleHandler = () => {
  var c=count;
    var newNode = {
      id : `${c}`,
      data : {label : `${c}` },
      type : "circle",
      position : {x : 0, y : 0}
    };
    newNode.data = {...newNode.data, id : `${newNode.id}` };
    setCount(count + 1);
    setElements((prev) => { return [... prev, newNode ]; });
  };

   const addElement = (v, pr) => {
     console.log("--add Element "+n);
     if (!v.hasOwnProperty('name')) return;
     n=n+1;
    const newNode = {
      id : `${n}`,
      data : {label : `${v['name']['text']}` },
      type : "default",
      position : {x : 0, y : 0}
    };
    newNode.data = {... newNode.data, id : `${newNode.id}` };
    if(pr>0){
      //var prev=n-1;
      var edge={id:`e${pr}-${n}` ,
            source:`${pr}`,
            target: `${n}` };

      setElements((prev) => { return [... prev, newNode,edge ]; });
    }
    else
    setElements((prev) => { return [... prev, newNode ]; });

    return n;
  };

  const traverse = (o, pr)=>{

    //console.log('==================');
    //console.log(o);
    //console.log('---------');

    if (Array.isArray(o)) {
       console.log('-----Array----');
      for (var i = 0; i < o.length; i++) {
        var v = o[i];
        var p= traverse(v, p);
      }
    } else if (typeof(o) == 'object') {
         console.log('-----Object----');
      var type = o['type'];
      if (type === 'Script' || type === 'CompoundList' ||
                                          type === 'Pipeline')
        traverse(o['commands'],0);
      else if (type === 'If') {
        // then

        // else
      } else if (type === 'Command'){
      //  func.apply(this, [o]);
    console.log('-----Command----');
        return addElement(o,pr);

      }
    }
  };

  const LoadHandler = () => {
    getData();
  /*  var ht = {};
    var n = 0;
        // const rawdata = raw('./terad-output.json');
    //var rawdata = fs.readFileSync('terad-output.json');
    var jsondata = JSON.parse(rawdata);
    traverse(jsondata);

    for (var x in ht) {
      var m = {};
      m['id'] = n++;
      m['data'] = x;

      console.log(m);*/
  //  }
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
      <ReactFlow elements = {elements}
      onElementsRemove = {elementRemoveHandler}
           onConnect = {connectHandler}
           deleteKeyCode =               {8 || 46}
           onEdgeUpdate = {edgeUpdateHandler}
           //nodeTypes={nodeTypes}
       snapToGrid = {true}
       snapGrid = {[16, 16]}
       connectionLineStyle =
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

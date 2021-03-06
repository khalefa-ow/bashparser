
import React, {useState, useEffect, useCallback } from "react";

import  {removeElements, updateEdge, addEdge, Background, MiniMap, Controls,isNode } from "react-flow-renderer";

 import ReactFlow from 'react-flow-renderer';

// you need these styles for React Flow to work properly
 import './style.css';

// additionally you can load the default theme
 import './theme.css';

import { nodeTypes } from "./Nodes";
import dagre from 'dagre';

import './layouting.css';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

  const getLayoutedElements = (elements, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });
  const nodeWidth = 120;
  const nodeHeight = 30;

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? 'left' : 'top';
      el.sourcePosition = isHorizontal ? 'right' : 'bottom';

      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. Moreover we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};

const layoutedElements = getLayoutedElements([]);


const ReactFlowRenderer = () => {
  var[elements, setElements] = useState([]);
  const[count, setCount] = useState(0);
  const[name, setName] = useState("");
  const[activeNode, setActiveNode] = useState();
  const[newName, setNewName] = useState("");
  const[instance, setInstance] = useState();

  var n=0;

  const getData=()=>{
    fetch('terad1.json'
    ,{
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        //console.log(myJson);
        traverse(myJson,-1);
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
  const AddEdge3= (n,pr ) => {
      var edge={id:`e${pr}-${n}` ,
            source:`${pr}`,
            target: `${n}`

          };

      setElements((prev) => { return [... prev, edge ]; });
      console.log("Edge 3----"+pr+"---->"+ n);

  };
const AddEdge2= (n,pr ) => {
    var edge={id:`e${pr}-${n}` ,
          source:`${pr}`,
          target: `${n}`

        };

    setElements((prev) => { return [... prev, edge ]; });
    console.log("Edge ----"+pr+"---->"+ n);

};
   const addElement = (v) => {
     if(!v.hasOwnProperty('name'))
          if( !(v['type']=='If' || v['type']=='EndIf')) return -1;
            n=n+1;
     var newNode = {};
     if(v['type']=='If'){
        newNode = {
            id : `${n}`,  data : {label : `If` }, type : "diamond",
            position : {x : Math.random()/100, y : Math.random() /100}
          };
          }
          else{
          if (v['type']=='EndIf')
           {
             newNode = {
              id : `${n}`,
              type : "circle",
                position : {x : Math.random()/100, y : Math.random() /100}
            };
          }else{
              newNode = {
                    id : `${n}`,
                    data : {label : `${v['name']['text']}   ${n}` },
                    type : "cmnd",   position : {x : Math.random()/100, y : Math.random() /100}
                  };
                  }

}
    newNode.data = {... newNode.data, id : `${newNode.id}` };
    setElements((prev) => { return [... prev, newNode ]; });

    return n;
  };

  const traverse = (o, pr)=>{
    if (Array.isArray(o)) {
      console.log('-----Array----');
      var p=pr;
      for (var i = 0; i < o.length; i++) {
        var v = o[i];
         var t= traverse(v, p);
         if(t!=-1){

           var edge={id:`e${p}-${t}` ,
                 source:`${p}`,
                 target: `${t}`, animated:true

               };

           setElements((prev) => { return [... prev, edge ]; });
         }
         p=t;
      }
      return p;
    } else if (typeof(o) == 'object') {
         console.log('-----Object----');
         var type = o['type'];
         if (type === 'Script' || type === 'CompoundList' ||
                                          type === 'Pipeline')
         return traverse(o['commands'],pr);
         else if (type === 'If') {
           var then1=-1;
           var else1 =-1;
           // then
           var if1=addElement(o);
           if(o.hasOwnProperty('then')){
                then1=traverse(o['then'],if1);

              }
          // else
          if(o.hasOwnProperty('else')){
             else1=traverse(o['else'],if1);
           }

          var if2=addElement({'type':'EndIf'});
       AddEdge2(if2,then1);

          if(else1!= -1)

           AddEdge2(if2,else1);
             else
              AddEdge2(if2,if1);

            return if2;
          } else if (type === 'Command'){
             //  func.apply(this, [o]);
            console.log('-----Command----');
            return addElement(o);
          }
    }
  };

  const LoadHandler = () => {
    getData();

  };

  const AdjustLayout = useCallback(
      () => {
        const layoutedElements = getLayoutedElements(elements, 'TB');
        setElements(layoutedElements);
      },
      [elements]
    );

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
      <div     className="layoutflow" style = {{
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
           nodeTypes={nodeTypes}
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
          Add</ button>
          <button type = "button" onClick = {AdjustLayout}>
              AdjustLayout</ button>
          <button type = "button" onClick = {LoadHandler}>
              Load</ button>
      <button type = "button" onClick = {saveChangesHandler}>
          Save changes</ button>

      </ div>

      </ div>);
};

export default ReactFlowRenderer;

import React from "react";
import ReactDOM from "react-dom";
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import dagre from "dagre";

const chart = {
  offset: {
    x: 0,
    y: 0
  },
  nodes: {
    node1: {
      id: "node1",
      type: "output-only",
      ports: {
        port1: {
          id: "port1",
          type: "output",
          properties: {
            value: "yes"
          }
        },
        port2: {
          id: "port2",
          type: "output",
          properties: {
            value: "no"
          }
        }
      }
    },
    node2: {
      id: "node2",
      type: "input-output",
      ports: {
        port1: {
          id: "port1",
          type: "input"
        },
        port2: {
          id: "port2",
          type: "output"
        }
      }
    },
    node3: {
      id: "node3",
      type: "input-output",
      ports: {
        port1: {
          id: "port1",
          type: "input"
        },
        port2: {
          id: "port2",
          type: "output"
        }
      }
    },
    node4: {
      id: "node4",
      type: "input-output",
      ports: {
        port1: {
          id: "port1",
          type: "input"
        },
        port2: {
          id: "port2",
          type: "output"
        }
      }
    },
    node5: {
      id: "node5",
      type: "input-output",
      ports: {
        port1: {
          id: "port1",
          type: "input"
        },
        port2: {
          id: "port2",
          type: "output"
        }
      }
    }
  },
  links: {
    link1: {
      id: "link1",
      from: {
        nodeId: "node1",
        portId: "port1"
      },
      to: {
        nodeId: "node2",
        portId: "port1"
      }
    },
    link2: {
      id: "link2",
      from: {
        nodeId: "node1",
        portId: "port2"
      },
      to: {
        nodeId: "node3",
        portId: "port1"
      }
    },
    link3: {
      id: "link3",
      from: {
        nodeId: "node2",
        portId: "port2"
      },
      to: {
        nodeId: "node4",
        portId: "port1"
      }
    },
    link4: {
      id: "link4",
      from: {
        nodeId: "node2",
        portId: "port2"
      },
      to: {
        nodeId: "node5",
        portId: "port1"
      }
    }
  },
  selected: {},
  hovered: {}
};

// calculate auto layout

const g = new dagre.graphlib.Graph();
g.setGraph({
  marginx: 20,
  marginy: 20
});
g.setDefaultEdgeLabel(function() {
  return {};
});

for (let nodeId in chart.nodes) {
  // you need to know dimension of every node
  g.setNode(nodeId, { width: 200, height: 100 });
}

for (let k in chart.links) {
  g.setEdge(chart.links[k].from.nodeId, chart.links[k].to.nodeId);
}

dagre.layout(g);

for (let nodeId in chart.nodes) {
  chart.nodes[nodeId].position = {
    x: g.node(nodeId).x - 200 / 2,
    y: g.node(nodeId).y - 100 / 2
  };
}

//

function App() {
  return <FlowChartWithState initialValue={chart} />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

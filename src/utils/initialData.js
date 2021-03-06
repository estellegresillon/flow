const style = { border: "none", boxShadow: "0 1px 4px 1px rgb(0 0 0 / 8%)" };

export const INITIAL_DATA = [
  {
    id: "1",
    type: "input",
    data: {
      label: "Welcome to React Flow!",
    },
    position: { x: 250, y: 15 },
    style: style,
  },
  {
    id: "2",
    data: {
      label: "This is a default node",
    },
    position: { x: 100, y: 120 },
    style,
  },
  {
    id: "3",
    data: {
      label: "This a default node",
    },
    position: { x: 400, y: 120 },
    style,
  },
  {
    id: "4",
    position: { x: 250, y: 200 },
    data: {
      label: "Another default node",
    },
    style,
  },
  {
    id: "5",
    data: {
      label: "Node id: 5",
    },
    position: { x: 250, y: 325 },
    style,
  },
  {
    id: "6",
    type: "output",
    data: {
      label: "An output node",
    },
    position: { x: 100, y: 480 },
    style,
  },
  {
    id: "7",
    type: "output",
    data: { label: "Another output node" },
    position: { x: 400, y: 450 },
    style,
  },
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  {
    id: "e3-4",
    source: "3",
    target: "4",
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
  },
];

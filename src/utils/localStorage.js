export const saveDocumentInLocalStorage = (name, elements) => {
  localStorage.setItem(name, JSON.stringify(elements));
};

export const saveNewFlowInLocalStorage = (flow) => {
  const allFlows = getAllFlowsFromLocalStorage() || [];
  allFlows.push(flow);
  localStorage.setItem("flows", JSON.stringify(allFlows));
};

export const getDocumentFromLocalStorage = (flow) => {
  return JSON.parse(localStorage.getItem(flow));
};

export const getAllFlowsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("flows"));
};

export const removeFlowFromLocalStorage = (flow) => {
  const allFlows = getAllFlowsFromLocalStorage() || [];
  const filteredFlows = allFlows.filter((f) => f !== flow);
  localStorage.setItem("flows", JSON.stringify(filteredFlows));

  localStorage.removeItem(flow);
};

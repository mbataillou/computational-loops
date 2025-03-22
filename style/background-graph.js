function generateGraphData() {
  const N = 2000;
  return {
    nodes: Array.from({ length: N }, (_, i) => ({
      id: i,
      color: "rgba(128, 0, 0, 0.05)",
      size: Math.random() * 25 + 2,
    })),
    links: Array.from({ length: N - 1 }, (_, id) => ({
      source: id + 1,
      target: Math.floor(Math.random() * id),
      color: "rgba(128, 128, 128, 0.05)",
    })),
  };
}

function initOrUpdateGraph() {
  let gData =
    JSON.parse(localStorage.getItem("graphData")) || generateGraphData();
  localStorage.setItem("graphData", JSON.stringify(gData));

  if (!window.backgroundGraph) {
    window.backgroundGraph = ForceGraph()(
      document.getElementById("background-graph"),
    )
      .width(window.innerWidth)
      .height(window.innerHeight)
      .graphData(gData)
      .nodeVal((node) => node.size)
      .nodeRelSize(1)
      .d3Force("charge", d3.forceManyBody().strength(-30))
      .d3Force("link", d3.forceLink().distance(100))
      .d3Force(
        "center",
        d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2),
      )
      .centerAt(window.innerWidth / 2, window.innerHeight / 2)
      .zoom(1)
      .linkDirectionalParticles(2)
      .nodeResolution(2)
      .linkResolution(2);

    let renderFrame;
    window.backgroundGraph.onRender(() => {
      cancelAnimationFrame(renderFrame);
      renderFrame = requestAnimationFrame(() =>
        window.backgroundGraph.tickFrame(),
      );
    });

    setTimeout(() => {
      window.backgroundGraph.graphData().nodes.forEach((node) => {
        node.fx = node.x;
        node.fy = node.y;
      });
    }, 3000);

    window.addEventListener(
      "resize",
      debounce(() => {
        window.backgroundGraph
          .width(window.innerWidth)
          .height(window.innerHeight)
          .d3Force(
            "center",
            d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2),
          );
      }, 150),
    );
  } else {
    window.backgroundGraph.graphData(gData);
  }
}

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

document.addEventListener("DOMContentLoaded", initOrUpdateGraph);

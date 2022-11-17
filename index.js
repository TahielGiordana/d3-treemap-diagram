fetch(
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"
)
  .then((res) => res.json())
  .then((res) => createTreemapDiagram(res));

function createTreemapDiagram(data) {
  const width = 1200;
  const height = 800;

  const svg = d3
    .select("body")
    .append("svg")
    .attr("id", "canvas")
    .attr("width", width)
    .attr("height", height);

  const root = d3.hierarchy(data).sum((d) => d.value);
  console.log(root.leaves());

  d3.treemap().size([width, height]).padding(1)(root);

  const tileColors = [
    "#414141",
    "#38a089",
    "#9e7b39",
    "#c46f00",
    "#00afaf",
    "#208f15",
    "#102a63",
    "#236c83",
    "#b9643c",
    "#b91818",
    "#0d0abd",
    "#750b0b",
    "#88077d",
    "#6276b9",
    "#033a0a",
    "#9e8600",
    "#8a3d6c",
    "#43a740",
    "#6f806f",
  ];
  //Create the tiles to the svg
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr("class", "tile")
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .style("stroke", "black")
    .attr("fill", (d) => {
      switch (d.data.category) {
        case "2600":
          return tileColors[0];
        case "Wii":
          return tileColors[1];
        case "NES":
          return tileColors[2];
        case "GB":
          return tileColors[3];
        case "DS":
          return tileColors[4];
        case "X360":
          return tileColors[5];
        case "PS3":
          return tileColors[6];
        case "PS2":
          return tileColors[7];
        case "SNES":
          return tileColors[8];
        case "GBA":
          return tileColors[9];
        case "PS4":
          return tileColors[10];
        case "3DS":
          return tileColors[11];
        case "N64":
          return tileColors[12];
        case "PS":
          return tileColors[13];
        case "XB":
          return tileColors[14];
        case "PC":
          return tileColors[15];
        case "PSP":
          return tileColors[16];
        case "XOne":
          return tileColors[17];
        default:
          return tileColors[18];
      }
    });

  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .selectAll("tspan")
    .data((d) => {
      return d.data.name.split(/(?=[A-Z][^A-Z])/g).map((v) => {
        return {
          text: v,
          x0: d.x0,
          y0: d.y0,
        };
      });
    })
    .enter()
    .append("tspan")
    .attr("x", (d) => d.x0 + 5)
    .attr("y", (d, i) => d.y0 + 15 + i * 10)
    .text((d) => d.text)
    .attr("font-size", ".6rem")
    .attr("fill", "white");
}

/*

In-class activity 08 starter code
Prof. Mosca
Modified: 12/08/21

*/

// Build your bar charts in this file


// Set dimensions and margins for plots
const width = 900;
const height = 450;
const margin = {left:50, right:50, bottom:50, top:50};
const yTooltipOffset = 15;


// TODO: What does this code do?
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);
// it finds the elements on the page and adds an svg then sets wdith, height, and viewbox

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/

// TODO: What does this code do?
let maxY1 = d3.max(data1, function(d) { return d.score; });
// it gets the max from the score data

// TODO: What does each line of this code do?
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]);
// it sets the scaling function for the y-axis

// TODO: What does each line of this code do?
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);
// it takes data values and maps it to the pixel values. It is similar to the section
// of code above (lines 50-52). The output gives both sides of the svg.

// TODO: What does each line of this code do?
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`)
   .call(d3.axisLeft(yScale1))
   .attr("font-size", '20px');
// it adds axis on both sides and gives the y-axis a scale

// TODO: What does each line of this code do?
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale1)
            .tickFormat(i => data1[i].name))
    .attr("font-size", '20px');
// it adds the x-axis and gives it a scale. TickFormat provides
// the labels of each column

/*

  Tooltip Set-up

*/

// TODO: What does each line of this code do?
const tooltip1 = d3.select("#hard-coded-bar")
                .append("div")
                .attr('id', "tooltip1")
                .style("opacity", 0)
                .attr("class", "tooltip");
// it selects the div that belongs to the hard-coded-bar and appends it

// TODO: What does each line of this code do?
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
          .style("opacity", 1);
}
// mouseover displays a name/score when the mouse is hovered over the specified data

// TODO: What does each line of this code do?
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px")
          .style("top", (event.y + yTooltipOffset) +"px");
}
// mousemove sets the position of the data equal to where the mouse is with a little bit of an offset

// TODO: What does this code do?
const mouseleave1 = function(event, d) {
  tooltip1.style("opacity", 0);
}
// mouseleave sets the opactity back to 'normal' after the mouse is not hovering over it
/*

  Bars

*/

// TODO: What does each line of this code do?
svg1.selectAll(".bar")
   .data(data1)
   .enter()
   .append("rect")
     .attr("class", "bar")
     .attr("x", (d,i) => xScale1(i))
     .attr("y", (d) => yScale1(d.score))
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score))
     .attr("width", xScale1.bandwidth())
     .on("mouseover", mouseover1)
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);

/// --------------
/// Based on Simple Charts Library by @ahoiin, Sebastian Sadowski
/// --------------

// define class
function nicarMinutes (el,val, height){

  var that = this;
  var data = [ val],
      margin = {top: 5, right: 3, bottom: 5, left: 3},
      innerWidth = 100 - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom,
      paddingEl = 7,
      elementsInRow = 25,
      row = 1,
      dataset = [];

  data.forEach(function(d, i) {
    while(d--) {
      var c = (i==0);
      dataset.push({color:c});
    }
  });

  var svg = d3.select(el).append("svg")
    .attr("width", 200)
    .attr("height", innerHeight )
    .append("g")
    .attr("transform", "translate(" + (margin.left ) + "," + (margin.top ) + ")");

  var circle = svg.selectAll("rect")
    .data(dataset)
    .enter().append("rect")
    .style("fill", "#31cfff")
    .style("opacity", 1)
    .attr('width', 2.7)
    .attr('height',2.7)
    .attr("x", function(d,i) { row = (i%elementsInRow == 0) ? i/elementsInRow : row; return ((i+1)-row*elementsInRow) * paddingEl;})
    .attr("y", function(d,i) { row = (i%elementsInRow == 0) ? i/elementsInRow : row; return row * paddingEl;})

   // simple animation on load: opaciy
  //  circle.transition()
  //   .duration(5)
  //   .delay(function(d,i) { return 5 * i; })
  //   .style("opacity", 1);
};

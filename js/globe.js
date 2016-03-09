var width = 200,
    height = 200;

var projection = d3.geo.orthographic()
    .translate([width / 2, height / 2])
    .scale(width / 2 - 20)
    .clipAngle(90)
    .precision(0.6);

var canvas = d3.select("#globe").append("canvas")
    .attr("width", width)
    .attr("height", height);

var c = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(c);

var participants = d3.select("#participants");
var title = d3.select("#country");

queue()
    .defer(d3.json, "js/world-110m.json")
    .defer(d3.tsv, "js/world-country-names2.tsv")
    .await(ready);

function ready(error, world, names) {
  if (error) throw error;

  var globe = {type: "Sphere"},
      land = topojson.feature(world, world.objects.land),
      countries = topojson.feature(world, world.objects.countries).features,
      borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }),
      i = -1,
      i2 = -1,
      n = countries.length;

  countries = countries.filter(function(d) {
    return names.some(function(n) {
      if (d.id == n.id) return d.name = n.name, d.number = n.number;
    });
  }).sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

  (function transition() {
    d3.transition()
        .duration(1250)
        .each("start", function() {
          title.text(countries[i = (i + 1) % n].name);
          if (countries[i2 = (i2 + 1) % n].number > 1) {
          participants.text( countries[i2 = (i2 + 0) % n].number + " participants")
        } else { participants.text( countries[i2 = (i2 + 0) % n].number + " participant") }
        })
        .tween("rotate", function() {
          var p = d3.geo.centroid(countries[i]),
              r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
          return function(t) {
            projection.rotate(r(t));
            c.clearRect(0, 0, width, height);
            c.fillStyle = "#d9d9d9", c.beginPath(), path(land), c.fill();
            c.fillStyle = "#439fd8", c.beginPath(), path(countries[i]), c.fill();
            c.strokeStyle = "#fff", c.lineWidth = .5, c.beginPath(), path(borders), c.stroke();
            c.strokeStyle = "#d9d9d9", c.lineWidth = 1, c.beginPath(), path(globe), c.stroke();
          };
        })
      .transition()
      .each("end", transition);
      if (i == 21) {
        i = -1;
        i2 = -1;
      }
  })();
}

d3.select(self.frameElement).style("height", height + "px");

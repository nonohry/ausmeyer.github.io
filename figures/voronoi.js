path {
  stroke: #fff;
}

path:first-child {
  fill: yellow !important;
}

circle {
  fill: #000;
  pointer-events: none;
}

.q0-9 { fill: rgb(197,27,125); }
.q1-9 { fill: rgb(222,119,174); }
.q2-9 { fill: rgb(241,182,218); }
.q3-9 { fill: rgb(253,224,239); }
.q4-9 { fill: rgb(247,247,247); }
.q5-9 { fill: rgb(230,245,208); }
.q6-9 { fill: rgb(184,225,134); }
.q7-9 { fill: rgb(127,188,65); }
.q8-9 { fill: rgb(77,146,33); }

</style>
<body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
<script>

var width = 960,
    height = 500;

var vertices = d3.range(100).map(function(d) {
  return [Math.random() * width, Math.random() * height];
});

var voronoi = d3.geom.voronoi()
    .clipExtent([[0, 0], [width, height]]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", function() { vertices[0] = d3.mouse(this); redraw(); });

var path = svg.append("g").selectAll("path");

svg.selectAll("circle")
    .data(vertices.slice(1))
  .enter().append("circle")
    .attr("transform", function(d) { return "translate(" + d + ")"; })
    .attr("r", 1.5);

redraw();

function redraw() {
  path = path
      .data(voronoi(vertices), polygon);

  path.exit().remove();

  path.enter().append("path")
      .attr("class", function(d, i) { return "q" + (i % 9) + "-9"; })
      .attr("d", polygon);

  path.order();
}

function polygon(d) {
  return "M" + d.join("L") + "Z";
}

</script>
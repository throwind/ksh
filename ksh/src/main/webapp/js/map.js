$(document).ready(function() {
var width = $(document).width()-100;
var height =$(document).height()-50;



var projection = d3.geo.mercator().translate([ width / 2, height / 2 ]).scale((width - 1) / 2 / Math.PI);
var zoom = d3.behavior.zoom().scaleExtent([ 1, 8 ]).on("zoom", zoomed);
var path = d3.geo.path().projection(projection);
var svg = d3.select("body").append("svg").attr("width", width).attr("height",height).append("g");

var g = svg.append("g");

svg.append("rect").attr("class", "overlay").attr("width", width).attr("height",height);

svg.call(zoom).call(zoom.event);

d3.json("/data/world-50m.json", function(error, world) {
	if (error)
		return console.error(error);

	g.append("path").datum({
		type : "Sphere"
	}).attr("class", "sphere").attr("d", path);
	g.append("path").datum(
			topojson.merge(world, world.objects.countries.geometries)).attr(
			"class", "land").attr("d", path);

	g.append("path").datum(
			topojson.mesh(world, world.objects.countries, function(a, b) {
				return a !== b;
			})).attr("class", "boundary").attr("d", path);

	svg.selectAll(".subunit-label").data(
			topojson.feature(world, world.objects.countries).features).enter()
			.append("text").attr("class", function(d) {
				return "subunit-label " + d.id;
			}).attr("transform", function(d) {
				return "translate(" + path.centroid(d) + ")";
			}).attr("dy", ".35em").text(function(d) {
				return d.properties.name;
			});
});
function zoomed() {
	g.attr("transform", "translate(" + d3.event.translate + ")scale("+ d3.event.scale + ")");
}

d3.select(self.frameElement).style("height", height + "px");
});
//Practically all this code comes from https://github.com/alangrafu/radar-chart-d3
//I only made some additions and aesthetic adjustments to make the chart look better 
//(of course, that is only my point of view)
//Such as a better placement of the titles at each line end, 
//adding numbers that reflect what each circular level stands for
//Not placing the last level and slight differences in color
//
//For a bit of extra information check the blog about it:
//http://nbremer.blogspot.nl/2013/09/making-d3-radar-chart-look-bit-better.html

var RadarChart = {
	draw: function (id, d, options, LegendOptions, year, level) {

		seriesID = [0,1,2,3,4,5,6,7,8,9];
		/////////////////////////////////////////////////////////
		/////////////////// Helper Function /////////////////////
		/////////////////////////////////////////////////////////
		//Taken from radarChart2.js to wrap text 
		//Taken from http://bl.ocks.org/mbostock/7555321
		//Wraps SVG text	
		function wrap(text, width) {
			text.each(function () {
				var text = d3.select(this),
					words = text.text().split(/\s+/).reverse(),
					word,
					line = [],
					lineNumber = 0,
					lineHeight = 1.4, // ems
					y = text.attr("y"),
					x = text.attr("x"),
					dy = parseFloat(text.attr("dy")),
					tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

				while (word = words.pop()) {
					line.push(word);
					tspan.text(line.join(" "));
					if (tspan.node().getComputedTextLength() > width) {
						line.pop();
						tspan.text(line.join(" "));
						line = [word];
						tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
					}
				}
			});
		}//wrap	

		var cfg = {
			radius: 5,
			w: 600,
			h: 600,
			factor: 1,
			factorLegend: .85,
			levels: 3,
			maxValue: 0,
			radians: 2 * Math.PI,
			opacityArea: 0.2,
			ToRight: 5,
			TranslateX: 80,
			TranslateY: 50,
			ExtraWidthX: 300,
			ExtraWidthY: 300,
			color: d3.scale.category10()
		};

		if ('undefined' !== typeof options) {
			for (var i in options) {
				if ('undefined' !== typeof options[i]) {
					cfg[i] = options[i];
				}
			}
		}
		cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function (i) { return d3.max(i.map(function (o) { return o.value; })) }));
		var allAxis = (d[0].map(function (i, j) { return i.axis }));
		var total = allAxis.length;
		var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
		var Format = d3.format('%');
		d3.select(id).select("svg").remove();

		var g = d3.select(id)
			.append("svg")
			.attr("width", cfg.w + cfg.ExtraWidthX)
			.attr("height", cfg.h + cfg.ExtraWidthY)
			.append("g")
			.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
		;

		var tooltip;

		//Circular segments
		for (var j = 0; j < cfg.levels - 1; j++) {
			var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
			g.selectAll(".levels")
				.data(allAxis)
				.enter()
				.append("svg:line")
				.attr("x1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
				.attr("y1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
				.attr("x2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total)); })
				.attr("y2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total)); })
				.attr("class", "line")
				.style("stroke", "grey")
				.style("stroke-opacity", "0.75")
				.style("stroke-width", "0.3px")
				.attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
		}

		//Text indicating at what % each level is
		for (var j = 0; j < cfg.levels; j++) {
			var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
			g.selectAll(".levels")
				.data([1]) //dummy data
				.enter()
				.append("svg:text")
				.attr("x", function (d) { return levelFactor * (1 - cfg.factor * Math.sin(0)); })
				.attr("y", function (d) { return levelFactor * (1 - cfg.factor * Math.cos(0)); })
				.attr("class", "label")
				.style("font-family", "sans-serif")
				.style("font-size", "10px")
				.attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")
				.attr("fill", "#737373")
				.text(Format((j + 1) * cfg.maxValue / cfg.levels));
		}

		series = 0;

		var axis = g.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");

		axis.append("line")
			.attr("x1", cfg.w / 2)
			.attr("y1", cfg.h / 2)
			.attr("x2", function (d, i) { return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
			.attr("y2", function (d, i) { return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
			.attr("class", "line")
			.style("stroke", "grey")
			.style("stroke-width", "1px");

		axis.append("text")
			.attr("class", "label")
			.text(function (d) { return d })
			.style("font-family", "sans-serif")
			.style("font-size", "11px")
			.attr("text-anchor", "middle")
			.attr("dy", "1.5em")
			.attr("transform", function (d, i) { return "translate(0, -25)" })
			.attr("x", function (d, i) { return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total); })
			.attr("y", function (d, i) { return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total); })
			.call(wrap, 60); // meant to wrap text labels around the cirle.

		d.forEach(function (y, x) {
			dataValues = [];
			g.selectAll(".nodes")
				.data(y, function (j, i) {
					dataValues.push([
						cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
						cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
					]);
				});
			dataValues.push(dataValues[0]);
			g.selectAll(".area")
				.data([dataValues])
				.enter()
				.append("polygon")
				.attr("class", "radar-chart-serie" + seriesID[series])
				.style("stroke-width", "2px")
				.style("stroke", cfg.color(series))
				.attr("points", function (d) {
					var str = "";
					for (var pti = 0; pti < d.length; pti++) {
						str = str + d[pti][0] + "," + d[pti][1] + " ";
					}
					return str;
				})
				.style("fill", function (j, i) { return cfg.color(series) })
				.style("fill-opacity", cfg.opacityArea)
				.on('mouseover', function (d) {
					
					z = "polygon." + d3.select(this).attr("class");
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", 0.1);
					g.selectAll(z)
						.transition(200)
						.style("fill-opacity", .7);
				})
				.on('mouseout', function () {
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", cfg.opacityArea);
				});
			series++;
		});
		series = 0;


		d.forEach(function (y, x) {
			g.selectAll(".nodes")
				.data(y).enter()
				.append("svg:circle")
				.attr("class", "radar-chart-serie" + seriesID[series])
				.attr('r', cfg.radius)
				.attr("alt", function (j) { return Math.max(j.value, 0) })
				.attr("cx", function (j, i) {
					dataValues.push([
						cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
						cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
					]);
					return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));
				})
				.attr("cy", function (j, i) {
					return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));
				})
				.attr("data-id", function (j) { return j.axis })
				.style("fill", cfg.color(series)).style("fill-opacity", .9)
				.on('mouseover', function (d) {
					newX = parseFloat(d3.select(this).attr('cx')) - 10;
					newY = parseFloat(d3.select(this).attr('cy')) - 5;

					tooltip
						.attr('x', newX)
						.attr('y', newY)
						.text(Format(d.value))
						.transition(200)
						.style('opacity', 1);

						console.log("TEST");
						console.log(d3.select(this).attr("class"));
					z = "polygon." + d3.select(this).attr("class");
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", 0.1);
					g.selectAll(z)
						.transition(200)
						.style("fill-opacity", .7);
				})
				.on('mouseout', function () {
					tooltip
						.transition(200)
						.style('opacity', 0);
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", cfg.opacityArea);
				})
				.append("svg:title")
				.text(function (j) { return Math.max(j.value, 0) });

			series++;
		});
		//Tooltip
		tooltip = g.append('text')
			.style('opacity', 0)
			.style('font-family', 'sans-serif')
			.style('font-size', '13px');



		////////////////////////////////////////////
		/////////// Initiate legend ////////////////
		////////////////////////////////////////////

		var svg = d3.select('#body')
			.selectAll('svg')
			.append('svg')
			.attr("width", options.w + 350)
			.attr("height", options.h)

		//Create the title for the legend
		var text = svg.append("text")
			.attr("class", "title")
			.attr('transform', 'translate(200,0)')
			.attr("x", options.w - 70)
			.attr("y", 10)
			.attr("font-size", "12px")
			.attr("fill", "#404040")
			.text("Vacancy Reason by " + level + " ," + year);

		//Initiate Legend	
		var legend = svg.selectAll(".legend")
			.data(LegendOptions)
			.enter().append("g")
			.attr("class", "legend")
			.attr("height", 100)
			.attr("width", 200)
			.attr('transform', 'translate(200,20)');

		//Create colour squares
		legend.append("rect")
			.attr("x", options.w - 65)
			.attr("y", function (d, i) { return i * 20; })
			.attr("width", 10)
			.attr("height", 10)
			.style("fill", function (d, i) { return options.colorscale(i); });

		//Create text next to squares
		legend.append("text")
			.attr("x", options.w - 52)
			.attr("y", function (d, i) { return i * 20 + 9; })
			.attr("font-size", "11px")
			.attr("fill", "#737373")
			.text(function (d) { return d; })
			;


		legend.on("mouseover", function (type) {
			d3.selectAll(".legend")
				.style("opacity", 0.1);
			d3.select(this)
				.style("opacity", 1);
			z = "polygon." + "radar-chart-serie" + LegendOptions.indexOf(type);
			d3.selectAll("polygon")
				.style("opacity", 0.1)
			d3.selectAll("line")
				.style("opacity", 0.1)
			d3.selectAll(z)
				.style("opacity", 1);
		})
			.on("mouseout", function (type) {
				d3.selectAll(".legend")
					.style("opacity", 1);
				d3.selectAll("line")
					.style("opacity", 1);
				d3.selectAll("polygon")
					.style("opacity", 1);
			});

	}
};
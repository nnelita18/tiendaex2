(function($) {
	graphCampaigns();
	graphCampaignsByCity();
	graphLedsbyAgent();
	graphStatusLeds();
})(jQuery);

function graphCampaigns() {
	am4core.ready(function() {

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	var data = [{
	  "country": "Campaña 1",
	  "units": 500,
	  "pie": [{
	    "value": 250,
	    "title": "Prospectos"
	  }, {
	    "value": 150,
	    "title": "Oportunidades"
	  }, {
	    "value": 100,
	    "title": "Clientes"
	  }]
	}, {
	  "country": "Campaña 2",
	  "units": 300,
	  "pie": [{
	    "value": 80,
	    "title": "Prospectos"
	  }, {
	    "value": 130,
	    "title": "Oportunidades"
	  }, {
	    "value": 90,
	    "title": "Clientes"
	  }]
	}, {
	  "country": "Campaña 3",
	  "units": 200,
	  "pie": [{
	    "value": 75,
	    "title": "Prospectos"
	  }, {
	    "value": 55,
	    "title": "Oportunidades"
	  }, {
	    "value": 70,
	    "title": "Clientes"
	  }]
	}];


	// Create chart instance
	var chart = am4core.create("chartdiv", am4charts.XYChart);
	chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
	chart.responsive.enabled = true;

	// Add data
	chart.data = data;

	// Create axes
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "country";
	categoryAxis.renderer.grid.template.disabled = true;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.title.text = "Units sold (M)";
	valueAxis.min = 0;
	valueAxis.renderer.baseGrid.disabled = true;
	valueAxis.renderer.grid.template.strokeOpacity = 0.07;

	// Create series
	var series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.valueY = "units";
	series.dataFields.categoryX = "country";
	series.tooltip.pointerOrientation = "vertical";


	var columnTemplate = series.columns.template;
	// add tooltip on column, not template, so that slices could also have tooltip
	columnTemplate.column.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
	columnTemplate.column.tooltipY = 0;
	columnTemplate.column.cornerRadiusTopLeft = 20;
	columnTemplate.column.cornerRadiusTopRight = 20;
	columnTemplate.strokeOpacity = 0;


	// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
	columnTemplate.adapter.add("fill", function(fill, target) {
	  var color = chart.colors.getIndex(target.dataItem.index * 3);
	  return color;
	});

	// create pie chart as a column child
	var pieChart = series.columns.template.createChild(am4charts.PieChart);
	pieChart.width = am4core.percent(80);
	pieChart.height = am4core.percent(80);
	pieChart.align = "center";
	pieChart.valign = "middle";
	pieChart.dataFields.data = "pie";

	var pieSeries = pieChart.series.push(new am4charts.PieSeries());
	pieSeries.dataFields.value = "value";
	pieSeries.dataFields.category = "title";
	pieSeries.labels.template.disabled = true;
	pieSeries.ticks.template.disabled = true;
	pieSeries.slices.template.stroke = am4core.color("#ffffff");
	pieSeries.slices.template.strokeWidth = 1;
	pieSeries.slices.template.strokeOpacity = 0;

	pieSeries.slices.template.adapter.add("fill", function(fill, target) {
	  return am4core.color("#ffffff")
	});

	pieSeries.slices.template.adapter.add("fillOpacity", function(fillOpacity, target) {
	  return (target.dataItem.index + 1) * 0.2;
	});

	pieSeries.hiddenState.properties.startAngle = -90;
	pieSeries.hiddenState.properties.endAngle = 270;

	var data = [{
	  "country": "Campaña 1",
	  "units": 500,
	  "pie": [{
	    "value": 250,
	    "title": "Prospectos"
	  }, {
	    "value": 150,
	    "title": "Oportunidades"
	  }, {
	    "value": 100,
	    "title": "Clientes"
	  }]
	}, {
	  "country": "Campaña 2",
	  "units": 300,
	  "pie": [{
	    "value": 80,
	    "title": "Prospectos"
	  }, {
	    "value": 130,
	    "title": "Oportunidades"
	  }, {
	    "value": 90,
	    "title": "Clientes"
	  }]
	}, {
	  "country": "Campaña 3",
	  "units": 30,
	  "pie": [{
	    "value": 75,
	    "title": "Prospectos"
	  }, {
	    "value": 55,
	    "title": "Oportunidades"
	  }, {
	    "value": 70,
	    "title": "Clientes"
	  }]
	}];


	// Create chart instance
	var chart = am4core.create("chart-campaigns", am4charts.XYChart);
	chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

	// Add data
	chart.data = data;

	// Create axes
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "country";
	categoryAxis.renderer.grid.template.disabled = true;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.title.text = "Unidades vendidas";
	valueAxis.min = 0;
	valueAxis.renderer.baseGrid.disabled = true;
	valueAxis.renderer.grid.template.strokeOpacity = 0.07;

	// Create series
	var series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.valueY = "units";
	series.dataFields.categoryX = "country";
	series.tooltip.pointerOrientation = "vertical";


	var columnTemplate = series.columns.template;
	// add tooltip on column, not template, so that slices could also have tooltip
	columnTemplate.column.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
	columnTemplate.column.tooltipY = 0;
	columnTemplate.column.cornerRadiusTopLeft = 20;
	columnTemplate.column.cornerRadiusTopRight = 20;
	columnTemplate.strokeOpacity = 0;


	// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
	columnTemplate.adapter.add("fill", function(fill, target) {
	  var color = chart.colors.getIndex(target.dataItem.index * 3);
	  return color;
	});

	// create pie chart as a column child
	var pieChart = series.columns.template.createChild(am4charts.PieChart);
	pieChart.width = am4core.percent(80);
	pieChart.height = am4core.percent(80);
	pieChart.align = "center";
	pieChart.valign = "middle";
	pieChart.dataFields.data = "pie";

	var pieSeries = pieChart.series.push(new am4charts.PieSeries());
	pieSeries.dataFields.value = "value";
	pieSeries.dataFields.category = "title";
	pieSeries.labels.template.disabled = true;
	pieSeries.ticks.template.disabled = true;
	pieSeries.slices.template.strokeWidth = 1;

	pieSeries.slices.template.adapter.add("stroke", function(stroke, target) {
	  return chart.colors.getIndex(target.parent.parent.dataItem.index * 3);
	});

	pieSeries.slices.template.adapter.add("fill", function(fill, target) {
	  return am4core.color("#ffffff")
	});

	pieSeries.slices.template.adapter.add("fillOpacity", function(fillOpacity, target) {
	  return (target.dataItem.index + 1) * 0.2;
	});

	pieSeries.hiddenState.properties.startAngle = -90;
	pieSeries.hiddenState.properties.endAngle = 270;

	// this moves the pie out of the column if column is too small
	pieChart.adapter.add("verticalCenter", function(verticalCenter, target) {
	  var point = am4core.utils.spritePointToSprite({ x: 0, y: 0 }, target.seriesContainer, chart.plotContainer);
	  point.y -= target.dy;

	  if (point.y > chart.plotContainer.measuredHeight - 15) {
	    target.dy = -target.seriesContainer.measuredHeight - 15;
	  }
	  else {
	    target.dy = 0;
	  }
	  return verticalCenter
	})

	}); // end am4core.ready()
}

function graphCampaignsByCity() {
	am4core.ready(function() {

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	// Create chart instance
	var chart = am4core.create("chart-campaignsbycity", am4charts.PieChart);
	chart.responsive.enabled = true;

	// Add and configure Series
	var pieSeries = chart.series.push(new am4charts.PieSeries());
	pieSeries.dataFields.value = "litres";
	pieSeries.dataFields.category = "country";

	// Let's cut a hole in our Pie chart the size of 30% the radius
	chart.innerRadius = am4core.percent(30);

	// Put a thick white border around each Slice
	pieSeries.slices.template.stroke = am4core.color("#fff");
	pieSeries.slices.template.strokeWidth = 2;
	pieSeries.slices.template.strokeOpacity = 1;
	pieSeries.slices.template
	  // change the cursor on hover to make it apparent the object can be interacted with
	  .cursorOverStyle = [
	    {
	      "property": "cursor",
	      "value": "pointer"
	    }
	  ];

	pieSeries.alignLabels = false;
	pieSeries.labels.template.bent = true;
	pieSeries.labels.template.radius = 3;
	pieSeries.labels.template.padding(0,0,0,0);

	pieSeries.ticks.template.disabled = true;

	// Create a base filter effect (as if it's not there) for the hover to return to
	var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
	shadow.opacity = 0;

	// Create hover state
	var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

	// Slightly shift the shadow and make it more prominent on hover
	var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
	hoverShadow.opacity = 0.7;
	hoverShadow.blur = 5;

	// Add a legend
	chart.legend = new am4charts.Legend();

	chart.data = [{
	  "country": "Puebla",
	  "litres": 501.9
	},{
	  "country": "Atlixco",
	  "litres": 165.8
	}, {
	  "country": "Teziutlán",
	  "litres": 139.9
	}, {
	  "country": "Libres",
	  "litres": 128.3
	}];

	}); // end am4core.ready()
}

function graphLedsbyAgent() {
	am4core.ready(function() {

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	// Create chart instance
	var chart = am4core.create("chart-leadsbyAgent", am4charts.XYChart);
	chart.responsive.enabled = true;

	// Add data
	chart.data = [{
	    "name": "Erik",
	    "points": 35654,
	    "color": chart.colors.next(),
	    "bullet": "assets/images/icons/person.svg"
	}, {
	    "name": "Francisco",
	    "points": 65456,
	    "color": chart.colors.next(),
	    "bullet": "assets/images/icons/person.svg"
	}, {
	    "name": "Ivan",
	    "points": 45724,
	    "color": chart.colors.next(),
	    "bullet": "assets/images/icons/person.svg"
	}, {
	    "name": "Omar",
	    "points": 13654,
	    "color": chart.colors.next(),
	    "bullet": "assets/images/icons/person.svg"
	}];

	// Create axes
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "name";
	categoryAxis.renderer.grid.template.disabled = true;
	categoryAxis.renderer.minGridDistance = 30;
	categoryAxis.renderer.inside = true;
	categoryAxis.renderer.labels.template.fill = am4core.color("#fff");
	categoryAxis.renderer.labels.template.fontSize = 20;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.grid.template.strokeDasharray = "4,4";
	valueAxis.renderer.labels.template.disabled = true;
	valueAxis.min = 0;

	// Do not crop bullets
	chart.maskBullets = false;

	// Remove padding
	chart.paddingBottom = 0;

	// Create series
	var series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.valueY = "points";
	series.dataFields.categoryX = "name";
	series.columns.template.propertyFields.fill = "color";
	series.columns.template.propertyFields.stroke = "color";
	series.columns.template.column.cornerRadiusTopLeft = 15;
	series.columns.template.column.cornerRadiusTopRight = 15;
	series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/b]";

	// Add bullets
	var bullet = series.bullets.push(new am4charts.Bullet());
	var image = bullet.createChild(am4core.Image);
	image.horizontalCenter = "middle";
	image.verticalCenter = "bottom";
	image.dy = 20;
	image.y = am4core.percent(100);
	image.propertyFields.href = "bullet";
	image.tooltipText = series.columns.template.tooltipText;
	image.propertyFields.fill = "color";
	image.filters.push(new am4core.DropShadowFilter());

	}); // end am4core.ready()
}

function graphStatusLeds() {
	am4core.ready(function() {

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	var chart = am4core.create("chart-statusleads", am4charts.PieChart3D);
	chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
	chart.responsive.enabled = true;

	chart.legend = new am4charts.Legend();

	chart.data = [
	  {
	    country: "En espera de respuesta",
	    litres: 201.1
	  },
	  {
	    country: "Vendido",
	    litres: 165.8
	  },
	  {
	    country: "No hubo acuerdo",
	    litres: 139.9
	  },
	  {
	    country: "Nunca contestó",
	    litres: 128.3
	  },
	  {
	    country: "Otros",
	    litres: 118.3
	  }
	];

	var series = chart.series.push(new am4charts.PieSeries3D());
	series.dataFields.value = "litres";
	series.dataFields.category = "country";

	}); // end am4core.ready()
}
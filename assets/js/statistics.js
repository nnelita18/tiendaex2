(function($) {

    createBarAreas();

    createSales();
    totalProspects();
    totalOport();
    totalClients()

})(jQuery);

function createBarAreas() {
    am4core.ready(function() {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create('areas-chart', am4charts.XYChart)
    chart.colors.step = 2;
    chart.responsive.enabled = true;

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = 30;
        bullet.label.text = '{valueY}'
        bullet.label.fill = am4core.color('#ffffff')

        return series;
    }

    chart.data = [
        {
            category: 'Prospectos',
            first: 40,
            second: 55,
            third: 60,
            fourth: 30
        },
        {
            category: 'Oportunidades',
            first: 30,
            second: 78,
            third: 69,
            fourth: 50
        },
        {
            category: 'Clientes',
            first: 27,
            second: 40,
            third: 45,
            fourth: 60
        }
    ]


    createSeries('first', 'Franquicias');
    createSeries('second', 'Micropayments');
    createSeries('third', 'Paga Express');
    createSeries('fourth', 'Trámites');

    function arrangeColumns() {

        var series = chart.series.getIndex(0);

        var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
            var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
            var delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                var middle = chart.series.length / 2;

                var newIndex = 0;
                chart.series.each(function(series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    }
                    else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                var visibleCount = newIndex;
                var newMiddle = visibleCount / 2;

                chart.series.each(function(series) {
                    var trueIndex = chart.series.indexOf(series);
                    var newIndex = series.dummyData;

                    var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }

    }); // end am4core.ready()
}

function createSales() {
    am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("sales-chart", am4charts.PieChart);

    // Add data
    chart.data = [ {
      "area": "Franquicias",
      "sales": 501.9
    }, {
      "area": "Micropayments",
      "sales": 301.9
    }, {
      "area": "paga express",
      "sales": 201.1
    }, {
      "area": "Trámites",
      "sales": 360.1
    }];

    // Set inner radius
    chart.innerRadius = am4core.percent(50);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "sales";
    pieSeries.dataFields.category = "area";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    }); // end am4core.ready()
}

function totalProspects() {
    am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("prospects-chart", am4charts.PieChart);
    chart.responsive.enabled = true;
    // Add data
    chart.data = [ {
      "area": "Franquicias",
      "porc": 501.9
    }, {
      "area": "Micropayments",
      "porc": 301.9
    }, {
      "area": "paga express",
      "sales": 201.1
    }, {
      "area": "Trámites",
      "sales": 360.1
    }
    ];

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "porc";
    pieSeries.dataFields.category = "area";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);


    }); // end am4core.ready()
}

function totalOport() {
    am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart
    var chart = am4core.create("oportu-chart", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.responsive.enabled = true;
    chart.data = [
      {
        area: "Franquicias",
        value: 260
      },
      {
        area: "Micropayments",
        value: 230
      },
      {
        area: "Paga Express",
        value: 410
      },
      {
        area: "Trámites",
        value: 510
      }
    ];

    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.radiusValue = "value";
    series.dataFields.category = "area";
    series.slices.template.cornerRadius = 6;
    series.colors.step = 3;

    series.hiddenState.properties.endAngle = -90;

    chart.legend = new am4charts.Legend();

    }); // end am4core.ready()
}

function totalClients() {
    am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("clients-chart", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.responsive.enabled = true;
    chart.data = [
      {
        area: "Franquicias",
        litres: 501.9
      },
      {
        area: "Micropayments",
        litres: 301.9
      },
      {
        area: "Paga Express",
        litres: 201.1
      },
      {
        area: "Trámites",
        litres: 606.1
      }
    ];

    chart.innerRadius = am4core.percent(40);
    chart.depth = 120;

    chart.legend = new am4charts.Legend();

    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.depthValue = "litres";
    series.dataFields.category = "area";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

    }); // end am4core.ready()
}
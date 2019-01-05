google.charts.load('current', {'packages':['sankey']});
      google.charts.setOnLoadCallback(drawChart);


function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'From');
        data.addColumn('string', 'To');
        data.addColumn('number', 'Weight');
        data.addRows([
          [ 'L1', 'L2', 2 ],
          [ 'L1', 'M2', 36 ],
          [ 'L1', 'H2', 4 ],
          [ 'M1', 'L2', 7 ],
          [ 'M1', 'M2', 35 ],
          [ 'M1', 'H2', 1 ],
          [ 'H1', 'L2', 15],
          [ 'H1', 'M2', 25],
          [ 'H1', 'H2', 0]
        ]);

        // Sets chart options.
        var options = {
          width: 600,
        };

        // Instantiates and draws our chart, passing in some options.
        var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));
        chart.draw(data, options);
      }

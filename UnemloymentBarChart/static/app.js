function unemploymentCharts() {
  d3.json(`/unemployment`).then(function(data) {

    // data from 2.5	World Development Indicators: Unemployment, http://wdi.worldbank.org/table/2.5
    console.log(data)
    var country = []
    var male = []
    var female = []

    for (var j = 0; j < 213; j++) {
      country.push(data[0][j]['country_name']),
      male.push(parseInt(data[0][j]['unemployment_percentofMales_2016'])),
      female.push(parseInt(data[0][j]['unemployment_percentofFemales_2016']))
    }
    console.log(country)
    console.log(male)
    console.log(female)

    var barData = [{
      x: country,
      y: male,
      marker: { color: 'blue' },
      name: 'Pct. Male',
      type: 'bar'
    },
    {
      x: country,
      y: female,
      marker: { color: 'red' },
      name: 'Pct. Female',
      type: 'bar'
    }]

    var updatemenus = [
      {
        buttons: [
          {
            args: [{ 'visible': [true, false] },
            { 'title': '2016 Pct. Male Unemployment' }],
            label: 'Male',
            method: 'update'
          },
          {
            args: [{ 'visible': [false, true] },
            { 'title': '2016 Pct. Female Unemployment' }],
            label: 'Female',
            method: 'update'
          },
          {
            args: [{ 'visible': [true, true] },
            { 'title': ' 2016 Pct. Unemployment by Gender' }],
            label: 'Reset',
            method: 'update'
          }
        ],
        direction: 'left',
        pad: { 'r': 10, 't': 10 },
        showactive: true,
        type: 'buttons',
        x: 0.1,
        xanchor: 'left',
        y: 1.2,
        yanchor: 'top'
      },

    ]

    var layout = {
      title: '2016 Unemployment by Gender',
      xaxis: {
        tickangle: -45
      },
      barmode: 'group',
      autosize: true,
      width: 1500,
      height: 650,
      updatemenus: updatemenus,
      yaxis: { title: 'Pct. Unemployment' }

    };

    Plotly.newPlot('hbar', barData, layout, { showSendToCloud: true });
  });
};
unemploymentCharts()
function unemploymentCharts() {
  d3.json(`/unemployment`).then(function(data) {

    // data from 2.5	World Development Indicators: Unemployment, http://wdi.worldbank.org/table/2.5
    console.log(data)
    var country = []
    var male = []
    var female = []
    var region = []
    var regionMale = []
    var regionFemale = []
    var income = []
    var incMale = []
    var incFemale = []

    for (var j = 0; j < 214; j++) {
      country.push(data[0][j]['country_name']),
      male.push(parseFloat(data[0][j]['unemployment_percentofMales_2016'])),
      female.push(parseFloat(data[0][j]['unemployment_percentofFemales_2016']))
    }

    for (var j = 214; j < 222; j++) {
      region.push(data[0][j]['country_name']),
      regionMale.push(parseFloat(data[0][j]['unemployment_percentofMales_2016'])),
      regionFemale.push(parseFloat(data[0][j]['unemployment_percentofFemales_2016']))
    }

    for (var j = 222; j < 226; j++) {
      income.push(data[0][j]['country_name']),
      incMale.push(parseFloat(data[0][j]['unemployment_percentofMales_2016'])),
      incFemale.push(parseFloat(data[0][j]['unemployment_percentofFemales_2016']))
    }



    // console.log(country)
    // console.log(male)
    // console.log(female)

    var barData = [{
      x: country,
      y: male,
      marker: { color: 'blue' },
      name: 'Pct. Male',
      type: 'bar',
      transforms: [{
          type: 'filter',
          target: male,
          operation: '>',
          value: 0
      },
      {
        type: 'sort',
        target: male,
        order: 'descending'
      },
      ]
    },
    {
      x: country,
      y: female,
      marker: { color: 'red' },
      name: 'Pct. Female',
      type: 'bar',
      transforms: [{
        type: 'filter',
        target: female,
        operation: '>',
        value: 0
    },
    {
      type: 'sort',
      target: female,
      order: 'descending'
    }]
  },
  {
    x: region,
    y: regionMale,
    marker: { color: 'blue' },
    name: 'Male Regional',
    type: 'bar'
},
{
  x: region,
  y: regionFemale,
  marker: { color: 'red' },
  name: 'Female Regional',
  type: 'bar'
},
{
  x: income,
  y: incMale,
  marker: { color: 'blue' },
  name: 'Male',
  type: 'bar'
},
{
x: income,
y: incFemale,
marker: { color: 'red' },
name: 'Female',
type: 'bar'
}]
    
    var updatemenus = [
      {
        buttons: [
          {
            args: [{ 'visible': [true, false, false, false, false, false] },
            { 'title': '2016 Male Unemployment' }],
            label: 'Male',
            method: 'update'
          },
          {
            args: [{ 'visible': [false, true, false, false, false, false] },
            { 'title': '2016 Female Unemployment' }],
            label: 'Female',
            method: 'update'
          },
          {
            args: [{ 'visible': [false, false, true, true, false, false] },
            { 'title': 'Regional Unemployment' }],
            label: 'Regional',
            method: 'update'
          },
          {
            args: [{ 'visible': [false, false, false, false, true, true] },
            { 'title': 'Unemployment by Country Income' }],
            label: 'Income',
            method: 'update'
          },
          {
            args: [{ 'visible': [false, false, false, false, false, false] },
            { 'title': ' 2016 Global Unemployment Data' }],
            label: 'Clear',
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
        tickangle: -90,
        automargin: true
      },
      barmode: 'group',
      autosize: true,
      width: 1500,
      height: 650,
      updatemenus: updatemenus,
      yaxis: { title: 'Unemployment (%)' }

    };

    Plotly.newPlot('hbar', barData, layout, { showSendToCloud: true });
  });
};
unemploymentCharts()
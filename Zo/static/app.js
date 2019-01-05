console.log("hello")

function unemploymentCharts() {
  d3.json(`/unemployment`).then(function(data) {

    // data from 2.5	World Development Indicators: Unemployment, http://wdi.worldbank.org/table/2.5
    console.log(data)}}
// Build a horizontal bar chart comparing male vs female unemployment

d3.csv("2.5_Unemployment.csv", function(error, data) {   //This will need to be refactored to link to Mongo

  // Log an error if one exists
  if (error) return console.warn(error);

  // Print the data
  // console.log(data);
  var country = data.map(data => data.country);
  var male = data.map(data => +data.male);
  var female = data.map(data => +data.female);
  
  console.log(country);
  console.log(male);
  console.log(female);

var trace1 = {
    x: country,  // data from 2.5	World Development Indicators: Unemployment, http://wdi.worldbank.org/table/2.5
    y: male,  
    name: '%Male',
    marker: {
      color: 'rgba(55,128,191,0.6)',
      width: 1
    },
    type: 'bar'
  };
  
  var trace2 = {
    x: country,   // data from 2.5	World Development Indicators: Unemployment, http://wdi.worldbank.org/table/2.5
    y: female,
    name: '%Female',
    type: 'bar',
    marker: {
      color: 'rgba(255,153,51,0.6)',
      width: 5
    }
  };
  
  var trace = [trace1, trace2];
  
  var layout = {
    title: '2016 Unemployment by Gender',
    barmode: 'stack',
    autosize: true,
    width: 1500,
    height: 650,
  };

  //Still need to add in axis formats
  Plotly.newPlot('hbar', trace, layout, {showSendToCloud:true});
});

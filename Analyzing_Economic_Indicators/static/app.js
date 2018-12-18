console.log("hello world")
    
function buildCharts() {
    
    d3.json(`/all`).then((Data) => {
        var countries = Data.map( d => d.Country)
        console.log(countries)
        var growthOne = Data.map( d => +d.GrowthOne)
        console.log(growthOne)
        var growthTwo = Data.map( d => +d.GrowthTwo)
        console.log(growthTwo)
        var LocTuples = Data.map( d => [+d.lat, +d.long] )
        console.log(LocTuples)
    


        
//         const countries = Data.Country;
//         const growthOne = Data.GrowthOne.map(Number);
//         const growthTwo = Data.GrowthTwo.map(Number);
//         const latitude = Data.lat;
//         const longitude = Data.long;
//         console.log(countries, growthOne, growthTwo, latitude, longitude);


            var trace1 = {
            x: countries,
            y: growthOne,
            name: '2015-2016 CPI Growth',
            type: 'bar'
            };

        
            var trace2 = {
            x: countries,
            y: growthTwo,
            name: '2016-2017 CPI Growth',
            type: 'bar'
            };

        var chartData = [trace1, trace2];

        var layout = {barmode: ''};

    Plotly.plot("myDiv", {data: chartData, layout: layout});
        })
    };

    buildCharts()

function buildCharts(country_index) {
    
    d3.json(`/countries/${country_index}`).then((Data) => {
        const countries = Data.Country;
        const growthOne = Data.GrowthOne.map(Number);
        const growthTwo = Data.GrowthTwo.map(Number);
        const latitude = Data.lat;
        const longitude = Data.long;
        console.log(countries, growthOne, growthTwo, latitude, longitude);


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

        var layout = {barmode: 'stack'};

    Plotly.plot("myDiv", {data: chartData, layout: layout});
    });
}
    

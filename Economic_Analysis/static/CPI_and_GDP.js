
var svgWidth = 900;
var svgHeight = 600;


var margin = {
    top: 40,
    right: 40,
    bottom: 80,
    left: 90
};

// // Create the width and height based svg margins and parameters to fit chart group within the canvas
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Create the chartGroup that will contain the data
// Use transform attribute to fit it within the canvas
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import Data
// var file = "Resources/data.csv"

// Function is called and passes csv data
d3.csv("static/data.csv").then(successHandle, errorHandle);

// Use error handling function to append data and SVG objects
// If error exist it will be only visible in console
function errorHandle(error) {
    throw err;
}

// Function takes in argument CountryData
function successHandle(countryData) {

    // Loop through the data and pass argument data
    countryData.map(function (data) {
        data.NGDP = +data.NGDP;
        data.NCPI = +data.NCPI;
    });

    //  Create scale functions
    // Linear Scale takes the min to be displayed in axis, and the max of the data
    var xLinearScale = d3.scaleLinear()
        .domain([0, 0.03, 0.2, 1])
        .range([0, width/1.5, width/1.285, width]);

    // var logScale = d3.scaleLinear()
    //     .domain([0, 1])
    //     .range([0, 1380000000]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, 0.02, 0.2, 1])
        .range([height, height/6.5, height/7.5,0]);

    // Create axis functions by calling the scale functions

    var bottomAxis = d3.axisBottom(xLinearScale)
        
        // Adjust the number of ticks for the bottom axis  
        .ticks(4);
    var leftAxis = d3.axisLeft(yLinearScale)
        .ticks(6);



    //   Append the axes to the chart group 
    //   Bottom axis moves using height 
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    // Left axis is already at 0,0
    // Only append the left axis 
    chartGroup.append("g")
        .call(leftAxis);



    // Create Circles for scatter plot
    var circlesGroup = chartGroup.selectAll("circle")
        .data(countryData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.NCPI))
        .attr("cy", d => yLinearScale(d.NGDP))
        .attr("r", d => d.Population/10000000)

        // .attr("r", "5")
        .attr("fill", "black")
        .attr("opacity", ".75")


    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([-10, 100])
        .html(function (d) {
            return (`${d.Country}<br>GDP: ${d.GDP} $ billions<br>CPI: ${d.CPI}% annual growth<br> POPULATION: ${d.Population} billions`);
        });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function (data) {
        toolTip.show(data, this);
    })
        // onmouseout event
        .on("mouseout", function (data) {
            toolTip.hide(data);
        });

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 30)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("GDP")
        .style("font-size", "20px");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 10})`)
        .attr("class", "axisText")
        .text("CPI")
        .style("font-size", "20px");

    chartGroup.append("text")
        .attr("x", (width / 1.5))
        .attr("y", 0 + (margin.top)-15)
        .text("Year : 2016")
        .style("font-size", "18px");

    chartGroup.append("text")
        .attr("x", (width / 1.5))
        .attr("y", 0 + (margin.top *1.2))
        .text("161 Countries")
        .style("font-size", "18px");

}

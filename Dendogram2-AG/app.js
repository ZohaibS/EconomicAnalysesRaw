var svgWidth = 900;
var svgHeight = 600;

var margin = {
    top: 40,
    right: 40,
    bottom: 80,
    left: 90
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//importing csv
var file = "population.csv"

d3.csv(file).then(successHandle, errorHandle);

function errorHandle(error) {
    throw err;
}

function successHandle(populationdata) {
    console.log(populationdata)

    // statesData.map(function (data) {
    //     data.poverty = +data.poverty;
    //     data.obesity = +data.obesity;
    };
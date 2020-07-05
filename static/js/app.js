function populateOptions() {
    // d3.event.preventDefault();
    d3.json("data/samples.json").then(function(data){

        // console.log(data)

        var dropdownOptions= data.names
        var selDataset = d3.select("#selDataset")
            
        // console.log(dropdownOptions)
        
        dropdownOptions.forEach(function (option) {
            selDataset.append("option")
            .text(option)
            .attr("value", function() {
            return option;
            });
        });

            
    })

}

populateOptions()


d3.selectAll("#selDataset").on("change", buildPlots);


function buildPlots() {

    var selectedID = d3.select("#selDataset").node().value;
    console.log(selectedID)
    barChart(selectedID);

};

function barChart(selectedID) {

    d3.json("data/samples.json").then(function(data){
    
        var selectedData = data.samples.filter( el => el.id === selectedID)

        var IDs = selectedData.map(el => el.otu_ids)
        
        IDs = IDs[0].slice(0,10)

        let otu_ids = [];

        IDs.forEach(function(name){
            otu_ids.push(`OTU ${name}`)
        })

        var sample_values = selectedData.map(el => el.sample_values)

        sample_values= sample_values[0].slice(0,10)

        var otu_labels =  selectedData.map(el => el.otu_labels)

        otu_labels = otu_labels[0].slice(0,10)

        console.log(otu_labels)
        console.log(sample_values)
        console.log(otu_ids)


        var trace1={
            type: "bar",
            x: sample_values,
            y:otu_ids,
            text:otu_labels,
            orientation: "h"
        }

        var layout = {

            yaxis: {
            autorange: "reversed"
            }
        };
        
            var plotData = [trace1];

            Plotly.newPlot("bar", plotData, layout);    
    })
    
}

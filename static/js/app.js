function populateOptions() {
    // d3.event.preventDefault()
    d3.json("data/samples.json").then(function(data){

        // console.log(data)

        var dropdownOptions= data.names
        var nameSelection = d3.select("#selDataset")
            
        // console.log(dropdownOptions)
    
        dropdownOptions.forEach(function (option) {
            nameSelection.append("option")
            .text(option)
            .attr("value", function() {
            return option
            })
        })    
    })
sampleMetadata(940)
bubbleChart(940)
barChart(940)
}

function randomID(){
    d3.json("data/samples.json").then(function(data){

        var dropdownOptions= data.names

        var randomElement = dropdownOptions[Math.floor(Math.random() * dropdownOptions.length)]
    
        console.log(randomElement)
    })

}

// randomID()

// Error en el HTML
d3.selectAll("#selDataset").on("change", change)

function change() {

    var selectedID = d3.select("#selDataset").node().value
    // console.log(selectedID)
    barChart(selectedID)
    sampleMetadata(selectedID)
    bubbleChart(selectedID)
}
// NO LEE EL SLICE
function barChart(selectedID) {

    d3.json("data/samples.json").then(function(data){
    
        var selectedData = data.samples.filter( el => el.id == selectedID)

        let IDs = selectedData.map(el => el.otu_ids)
        
        // NO LO LEE
       if (IDs[0]) {console.log("Si")}

        IDs = IDs[0].slice(0,10)

        let otu_ids = []

        IDs.forEach(function(name){
            otu_ids.push(`OTU ${name}`)
        })

        var sample_values = selectedData.map(el => el.sample_values)

        sample_values= sample_values[0].slice(0,10)

        var otu_labels =  selectedData.map(el => el.otu_labels)

        otu_labels = otu_labels[0].slice(0,10)

        // console.log(otu_labels)
        // console.log(sample_values)
        // console.log(selectedData)

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
        }
        
            var plotData = [trace1]

            Plotly.newPlot("bar", plotData, layout)    
    })
    
}

function sampleMetadata(selectedID){
    d3.json("data/samples.json").then(function(data){

        var selectedData = data.metadata.filter( el => el.id == selectedID)

        var id = selectedData[0].id
        var ethnicity = selectedData[0].ethnicity
        var gender = selectedData[0].gender
        var age = selectedData[0].age
        var location = selectedData[0].location
        var bbtype = selectedData[0].bbtype
        var wfreq = selectedData[0].wfreq

        var panel = d3.select("#sample-metadata")

        panel.html("")
        // COMO PONERLE NEGRITAS
        panel.append("p").text(`ID: ${id}`)
        panel.append("p").text(`Ethnicity: ${ethnicity}`)
        panel.append("p").text(`Gender: ${gender}`)
        panel.append("p").text(`Age: ${age}`)
        panel.append("p").text(`Location: ${location}`)
        panel.append("p").text(`BB Type: ${bbtype}`)
        panel.append("p").text(`W Frequency: ${wfreq}`)
    })
}
// NO ES RESPONSIVO
// PALETA DE COLORES
function bubbleChart(selectedID) {
    d3.json("data/samples.json").then(function(data){

        var selectedData = data.samples.filter( el => el.id == selectedID)

        var otu_ids = selectedData.map(el => el.otu_ids)
        
        otu_ids = otu_ids[0]


        var sample_values = selectedData.map(el => el.sample_values)

        sample_values = sample_values[0]

        var otu_labels =  selectedData.map(el => el.otu_labels)

        otu_labels = otu_labels[0]
        
        // console.log(otu_ids)
        // console.log(sample_values)
        // console.log(otu_labels)


        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              color: otu_ids,
              size: sample_values
            }
          };
          
          var data = [trace1];
          
          var layout = {
            showlegend: false,
            xaxis: {
                title: {
                  text: 'OTU ID',
                },
              },
          };
          
          Plotly.newPlot('bubble', data, layout);

      
    })
}

populateOptions()



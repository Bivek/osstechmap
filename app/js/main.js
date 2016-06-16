var nodes;
var edges;
var options;

// Get "Microservices" related OSS
var getNodesP = $.getJSON("data/ms.nodes.json");
var getEdgesP = $.getJSON("data/ms.edges.json");
var getOptionsP = $.getJSON("data/ms.options.json");

$.when(getNodesP, getEdgesP, getOptionsP).done(function(nodesData, edgesData, optionsData) {
    console.log(JSON.stringify(nodesData));
    console.log(JSON.stringify(edgesData));
    console.log(JSON.stringify(optionsData));
    // create an array with nodes
    nodes = new vis.DataSet(nodesData[0]);
    // create an array with edges
    edges = new vis.DataSet(edgesData[0]);
    // create an options object with concepts (groups)
    options = new vis.DataSet(optionsData[0])._options;

    console.log("options => " + JSON.stringify(options));

    // create a network
    var container = document.getElementById('oss-network');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var network = new vis.Network(container, data, options);
});

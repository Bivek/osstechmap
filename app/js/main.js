var nodes;
var edges;

// Get "Microservices" related OSS
var getNodesP = $.getJSON("data/ms.nodes.json");
var getEdgesP = $.getJSON("data/ms.edges.json");

$.when(getNodesP, getEdgesP).done(function(nodesData, edgesData) {
    console.log(JSON.stringify(nodesData));
    console.log(JSON.stringify(edgesData));
    // create an array with nodes
    nodes = new vis.DataSet(nodesData[0]);
    // create an array with edges
    edges = new vis.DataSet(edgesData[0]);

    // create a network
    var container = document.getElementById('oss-network');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};
    var network = new vis.Network(container, data, options);
});

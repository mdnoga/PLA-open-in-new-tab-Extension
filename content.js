// content.js

var targetNodes         = $("div.ipardot-container");
var MutationObserver    = window.MutationObserver || window.WebKitMutationObserver;
var observer          = new MutationObserver (mutationHandler);
var obsConfig           = { childList: true, characterData: false, attributes: false, subtree: true };

//--- Add a target node to the observer. Can only add one node at a time.
targetNodes.each ( function () {
    console.info ("node found");
    observer.observe (this, obsConfig);
} );

function mutationHandler (mutationRecords) {
    console.info ("mutationHandler:");
    mutationRecords.forEach ( function (mutation) {
        var newNodes = mutation.addedNodes; // DOM NodeList
        addNewStuff(newNodes);
    } );
}

function addNewStuff(newNodes) {
    var $nodes = $(newNodes); // jQuery set
    $nodes.each(function() {
        var $node = $(this);
        var link = $node.find("td a").not("[href*='#']").not("[href*='javascript']").attr('href');
        var lightningURL = buildLightningUrl(link);
        //$node.find("td a").not("[href*='#']").not("[href*='javascript']").not("[href*='http']").after("<a href='https://pi.pardot.com" + link + "' target='_blank'>[&nearhk;]</a>");
        $node.find("td a").not("[href*='#']").not("[href*='javascript']").not("[href*='http']").after("<a href='" + lightningURL + "' target='_blank'>[&nearhk;]</a>");
    });  
}

function buildLightningUrl(link) {
    var link = encodeURIComponent(link);
    // get current top level URL from session storage
    var canvasCleintDataJSON = sessionStorage.getItem('canvas_client_data')
    var canvasCleintData = jQuery.parseJSON(canvasCleintDataJSON);
    var path = '/lightning/page/pardot/prospect?pardot__path=';
    var lightningUrl = canvasCleintData.instanceUrl + path + link + '%3FrAndOmiZer=' + Math.random()
    return lightningUrl;
}


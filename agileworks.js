define(function(require, exports, module) {
    main.consumes = ["Plugin", "Panel", "ui", "Form", "Editor", "tabManager"];
    main.provides = ["agileworks"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var Panel = imports.Panel;
        var Form = imports.Form;
        var Editor = imports.Editor;
        var tabManager = imports.tabManager;
        var ui = imports.ui;

        var markup = require("text!./plugin.xml");
        
        /***** Initialization *****/
        
        var plugin = new Panel("Ajax.org", main.consumes, {
            index: 100,
            width: 250,
            caption: "AgileWorks",
            minWidth: 130,
            where: "left"
        });

        var emit = plugin.getEmitter();
        
        function load() {
            
        }
        
        /***** Methods *****/
        
        
        
        /***** Lifecycle *****/
        
        plugin.on("draw", function(e){
            // Insert css
            ui.insertCss(require("text!./panel.css"), options.staticPrefix, plugin);
        
            // Set some custom HTML
            e.html.innerHTML = require("text!./panel.html");
            
            var btnOpenBook = document.getElementById("btnOpenBook");
            
            btnOpenBook.onclick = function() {
                  var newTab = tabManager.open({
                      value      : "https://trunkstudio.gitbooks.io/react-native/content/",
                      editorType : "urlview",
                      active     : true,
                  }, function(err, tab) {});
                  
                  newTab.title = "Tutorial";
                  
            };
        });
        

        plugin.on("load", function() {
            load();
        });
        
        plugin.on("unload", function() {
        
        });
        
        /***** Register and define API *****/
        
        plugin.freezePublicAPI({
            
        });
        
        register(null, {
            "agileworks": plugin
        });
    }
});
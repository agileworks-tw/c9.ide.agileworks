define(function(require, exports, module) {
    main.consumes = ["Plugin", "Panel", "ui", "Form", "Editor", "tabManager", "fs"];
    main.provides = ["agileworks"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var Panel = imports.Panel;
        var Form = imports.Form;
        var Editor = imports.Editor;
        var tabManager = imports.tabManager;
        var ui = imports.ui;
        var fs = imports.fs;

        var markup = require("text!./plugin.xml");
        
        /***** Initialization *****/
        
        var plugin = new Panel("Ajax.org", main.consumes, {
            index: 100,
            width: 250,
            caption: "Tutorial",
            minWidth: 130,
            where: "left"
        });

        var emit = plugin.getEmitter();
        
        function load() {
            
        }
        
        /***** Methods *****/
        
        
        
        /***** Lifecycle *****/
        
        plugin.on("draw", function(e){

            //require("text!./panel.css")
            
            fs.readFile('/.agileworks/index.css', function(err, data) {
                ui.insertCss(data, options.staticPrefix, plugin);
            });
        
            fs.readFile('/.agileworks/index.html', function(err, data) {
                if (err) throw err;

                e.html.innerHTML = data;
                
                var links = e.html.querySelectorAll('a');
    
                for (var i = 0; i < links.length; i++) {
                    var link = links[i];
                    link.onclick = function() {
                        var newTab = tabManager.open({
                            active      : true,
                            editorType  : "urlview",
                            value       : this.getAttribute('href'),
                            document    : {
                                title : this.getAttribute('title'),
                                urlview : {
                                    backgroundColor : "#FFFFFF",
                                    dark : false
                                }
                            }
                        });
                        return false;
                    };
                }
            });


        });
        
        // plugin.on("load", function() {
        //     load();
        // });
        
        // plugin.on("unload", function() {
        
        // });
        
        /***** Register and define API *****/
        
        plugin.freezePublicAPI({
            
        });
        
        register(null, {
            "agileworks": plugin
        });
    }
});
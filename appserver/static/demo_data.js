require([
    "splunkjs/mvc",
    "splunkjs/mvc/utils",
    "splunkjs/mvc/tokenutils",
    "underscore",
    "jquery",
    "splunkjs/mvc/simplexml",
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/chartview',
    'splunkjs/mvc/savedsearchmanager',
    'splunk.util',
], function(
        mvc,
        utils,
        TokenUtils,
        _,
        $,
        DashboardController,
        TableView,
        ChartView,
        SavedSearchManager,
        splunkUtil
    ) {

    // Tokens
    var submittedTokens = mvc.Components.getInstance('submitted', {create: true});
    var defaultTokens   = mvc.Components.getInstance('default', {create: true});

    var ActionRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            // Only use the cell renderer for the specific field
            return (cell.field==="action");
        },
        render: function($td, cell) {
            if(cell.value=="disabled") {
                $td.addClass(cell.field).html(_.template('<button id="toggle_enable">Enable</button>', {
                    text: cell.value
                }));        
            } else {
                $td.addClass(cell.field).html(_.template('<button id="toggle_enable">Disable</button>', {
                    text: cell.value
                }));        
            }
        }
    });

    var CustomCellRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            // Only use the cell renderer for the specific field
            return (cell.field==="title" || cell.field==="disabled");
        },
        render: function($td, cell) {
            // ADD class to cell -> CSS
            $td.addClass(cell.field).html(cell.value);
        }
    });


    mvc.Components.get('demo_alerts').getVisualization(function(tableView) {
        // Add custom cell renderer
        tableView.table.addCellRenderer(new CustomCellRenderer());
        tableView.table.addCellRenderer(new ActionRenderer());
        tableView.table.render();

    });

    $(document).on("click", "#toggle_enable", function(event){
        //var job_id = ($(this).parent().find("td.job_id")[0].innerHTML);
        var search_name = $(this).parent().parent().find("td.title")[0].innerHTML;
        var state = $(this).parent().parent().find("td.disabled")[0].innerHTML;

        console.debug("search_name", search_name);
        console.debug("state", state);

        var action = "disable";
        if(state=="1") {
            action = "enable";
        } 

        var post_data = {
            search_name    : search_name,
            action         : action,
        };

        var url = splunkUtil.make_url('/custom/SA-alert_manager_demo/demo_data/toggle_search');
        console.debug("url", url);

        $.ajax( url,
                {
                    uri:  url,
                    type: 'POST',
                    data: post_data,
                    
                   
                    success: function(jqXHR, textStatus){
                        // Reload the table
                        mvc.Components.get("demo_alerts_search").startSearch()
                        console.debug("success");
                    },
                    
                    // Handle cases where the file could not be found or the user did not have permissions
                    complete: function(jqXHR, textStatus){
                        console.debug("complete");
                    },
                    
                    error: function(jqXHR,textStatus,errorThrown) {
                        console.log("Error");
                    } 
                }
        );
    });
    // Save Settings
    $(document).on("click", "#load_sample_metadata", function(event){
        // run ajax call to load sample metadata

        /*data = JSON.stringify(data);
        var post_data = {
            contents    : data
        };*/

        //var url = 'http://splunk.local/en-GB/custom/alert_manager/alert_settings/save';
        var url = splunkUtil.make_url('/custom/SA-alert_manager_demo/demo_data/load_demo_data');
        console.debug("url", url);

        $("<img />").attr('src', splunkUtil.make_url('/static/app/SA-alert_manager_demo/wait.gif')).attr('id', 'wait').height(21).insertAfter($("#load_sample_metadata"));

        $.ajax( url,
                {
                    uri:  url,
                    type: 'GET',
                    //data: post_data,
                    
                   
                    success: function(jqXHR, textStatus){
                        // Reload the table
                        alert("Sample data successfully loaded.")
                        $("#wait").remove();
                        console.debug("success");
                    },
                    
                    // Handle cases where the file could not be found or the user did not have permissions
                    complete: function(jqXHR, textStatus){
                        console.debug("complete");
                        $("#wait").remove();
                    },
                    
                    error: function(jqXHR,textStatus,errorThrown) {
                        console.log("Error");
                        $("#wait").remove();
                    } 
                }
        );
    });

    $(document).on("click", "#clear_data", function(event){
        
        if(confirm('Are you sure to remove all incident and incident settings?')) {
                
            var url = splunkUtil.make_url('/custom/SA-alert_manager_demo/demo_data/clear_data');
            console.debug("url", url);

            $("<img />").attr('src', splunkUtil.make_url('/static/app/SA-alert_manager_demo/wait.gif')).attr('id', 'wait').height(21).insertAfter($("#clear_data"));

            $.ajax( url,
                    {
                        uri:  url,
                        type: 'GET',
                        //data: post_data,
                        
                       
                        success: function(jqXHR, textStatus){
                            // Reload the table
                            alert("Incident data successfully cleared.")
                            $("#wait").remove();
                            console.debug("success");
                        },
                        
                        // Handle cases where the file could not be found or the user did not have permissions
                        complete: function(jqXHR, textStatus){
                            console.debug("complete");
                            $("#wait").remove();
                        },
                        
                        error: function(jqXHR,textStatus,errorThrown) {
                            console.log("Error");
                            $("#wait").remove();
                        } 
                    }
            );
        }
    });

    new SavedSearchManager({
        id: "sample_incidents_search",
        searchname: "demo_loaddata_sample_incidents",
        cache: false,            
        autostart: false,
        "dispatch.earliest_time": "-1m",
        "dispatch.latest_time": "now",
        app: "SA-alert_manager_demo"
    });
    $(document).on("click", "#load_sample_incidents", function(event){
        $("<img />").attr('src', splunkUtil.make_url('/static/app/SA-alert_manager_demo/wait.gif')).attr('id', 'wait').height(21).insertAfter($("#load_sample_incidents"));
        var sample_incidents_search = mvc.Components.getInstance('sample_incidents_search');
        sample_incidents_search.startSearch();
        sample_incidents_search.on("search:done", function(properties) {
            alert("Sample incidents loaded!");
            $("#wait").remove();
        });
    });

    new SavedSearchManager({
        id: "sample_incident_settings_search",
        searchname: "demo_loaddata_sample_incident_settings",
        cache: false,            
        autostart: false,
        "dispatch.earliest_time": "-1m",
        "dispatch.latest_time": "now",
        app: "SA-alert_manager_demo"
    });
    $(document).on("click", "#load_sample_incident_settings", function(event){
        // Create saved search manager here, run demo_loaddata_sample_incidents_settings search
        $("<img />").attr('src', splunkUtil.make_url('/static/app/SA-alert_manager_demo/wait.gif')).attr('id', 'wait').height(21).insertAfter($("#load_sample_incident_settings"));
        var sample_incident_settings_search = mvc.Components.getInstance('sample_incident_settings_search');
        sample_incident_settings_search.startSearch();
        sample_incident_settings_search.on("search:done", function(properties) {
            alert("Sample incident settings loaded!");
            $("#wait").remove();
        });
    });

    new SavedSearchManager({
        id: "sample_alert_users_search",
        searchname: "demo_loaddata_sample_alert_users",
        cache: false,            
        autostart: false,
        "dispatch.earliest_time": "-1m",
        "dispatch.latest_time": "now",
        app: "SA-alert_manager_demo"
    });
    $(document).on("click", "#load_sample_alert_users", function(event){
        // Create saved search manager here, run demo_loaddata_sample_incidents_settings search
        $("<img />").attr('src', splunkUtil.make_url('/static/app/SA-alert_manager_demo/wait.gif')).attr('id', 'wait').height(21).insertAfter($("#load_sample_alert_users"));
        var sample_alert_users_search = mvc.Components.getInstance('sample_alert_users_search');
        sample_alert_users_search.startSearch();
        sample_alert_users_search.on("search:done", function(properties) {
            alert("Sample alert users loaded!");
            $("#wait").remove();
        });
    });
});
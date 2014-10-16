define([
    'jquery',
    'underscore',
    'backbone',
    'views/main/panelView',
    'views/main/formView',
    'i18n'
], function($, _, Backbone, PanelView, FormView) {

    var MainView = Backbone.View.extend({

        initialize : function(options) {
            this.el = options.el;
            $(this.el).append(
                '<div class="row content">'+
                '   <div class="col-md-3 widgetsPanel nano"></div>'+
                '   <div class="col-md-9 dropArea"></div>'+
                '   <div class="col-md-5 settings nano"></div>'+
                '</div>'
            );

            this.URLOptions = options.URLOptions;

            this.form = options.form;

            this.panelView = new PanelView({
                el: '.widgetsPanel',
                collection: this.form,
            });

            this.formView = new FormView({
                collection: this.form,
                el: $('.dropArea')
            });

            this.panelView.render();
            this.formView.render();

            _.bindAll(this, 'getFormXML', 'downloadXML', 'importXML', 'getSubView');
        },

        getSubView : function(subViewID) {
            return this.formView.getSubView(subViewID);
        },

        clear: function() {
            this.form.clearAll();
        },

        getFormXML : function() {
            return this.formView.getXML();
        },

        getFormJSON : function() {
            return this.formView.getJSON();
        },

        downloadXML : function() {
            return this.formView.downloadXML();
        },

        importXML : function() {
            return this.formView.importXML();
        },

        importJSON : function() {
            return this.formView.importJSON();
        }
    });

    return MainView;

});
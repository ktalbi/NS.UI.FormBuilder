define([
    'jquery',
    'underscore',
    'backbone',
    'views/fieldViews/baseView',
    'text!../../../templates/fieldView/thesaurusFieldView.html',
    'backbone.radio'
], function($, _, Backbone, BaseView, viewTemplate, Radio) {

    var TreeViewFieldView = BaseView.extend({
        events: function() {
            return _.extend({}, BaseView.prototype.events, {
            });
        },

        initialize : function(options) {
            var opt = options;
            opt.template = viewTemplate;

            BaseView.prototype.initialize.apply(this, [opt]);
            this.mainChannel = Backbone.Radio.channel('global');

            this.mainChannel.on('nodeSelected' + this.model.get('id'), _.bind(function(data) {
                console.log ("receive")
                //this.model.set('defaultNode', data.node.key)

                console.log (this.$el.first('.thesaurusField').fancytree('getTree'))
                if (data['node']['children'] !== null) {
                    this.$el.first('.thesaurusField').fancytree('getTree').reload({
                        children : data['node']['children']
                    });
                } else {
                    var arr = [];
                    arr[0] = data.node;
                    this.$el.first('.thesaurusField').fancytree('getTree').reload(arr);
                }
            }, this));
        },

        render : function() {
            BaseView.prototype.render.apply(this, arguments);
            console.log ("render")
            require(['jquery-ui', 'fancytree'], _.bind(function() {
                $.getJSON(this.model.get('webServiceURL'), _.bind(function(data) {

                    this.$el.first('.thesaurusField').fancytree({
                        source: data['d'],
                        checkbox : false,
                        selectMode : 2
                    });

                }, this)).error(function(a,b , c) {
                    alert ("can't load ressources !");
                })

            }, this));
        }
    });

	return TreeViewFieldView;

});
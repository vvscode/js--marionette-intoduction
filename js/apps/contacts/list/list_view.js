ContactManager.module('ContactApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
    List.Contact = Backbone.Marionette.ItemView.extend({
        template: "#contact-list-item",
        tagName: 'tr',
        events: {
            'click': 'highlightName',
            'click td': 'alertTableCellContent'
        },
        highlightName: function(){
            this.$el.toggleClass('warning');
        },
        alertTableCellContent: function(ev){
            var $el = $(ev.target);
            alert($el.text());
        }
    });

    List.Contacts =  Backbone.Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'table table-hover',
        itemView: List.Contact,
        itemViewContainer: 'tbody',
        template: '#contact-list'
    });
});
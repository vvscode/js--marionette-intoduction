ContactManager.module('ContactApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
    List.Contact = Backbone.Marionette.ItemView.extend({
        template: "#contact-list-item",
        tagName: 'tr',
        events: {
            'click': 'highlightName',
            'click .js-delete': 'onDeleteClick',
        },
        highlightName: function(){
            this.$el.toggleClass('warning');
            this.trigger('contact:highlighting:toggled', this.model);
        },
        onDeleteClick: function(ev){
            ev.stopPropagation();
            this.trigger('contact:delete', this.model);
        },
        remove: function(){
            this.$el.fadeOut(function(){
                $(this).remove();
            });
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
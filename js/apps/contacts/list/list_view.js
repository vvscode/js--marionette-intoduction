ContactManager.module('ContactApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
    List.Contact = Backbone.Marionette.ItemView.extend({
        template: "#contact-list-item",
        tagName: 'li'
    });

    List.Contacts =  Backbone.Marionette.CollectionView.extend({
        tagName: 'ul',
        itemView: List.Contact
    });
});
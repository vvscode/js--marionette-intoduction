ContactManager.module('ContactsApp.Show', function(Show, ContactManager, Backbone, Marionette, $, _){
   Show.Contact = Marionette.ItemView.extend({
      template: "#contact-view",
       events: {
           'click a.js-list-contacts': 'onBackToListClick'
       },
       onBackToListClick: function(ev){
           ev.stopImmediatePropagation();
           ContactManager.trigger('contacts:list');
       }
   });

    Show.MissingContact = Show.Contact.extend({
        template: '#missing-contact-view'
    })
});
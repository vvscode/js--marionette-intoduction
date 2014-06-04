ContactManager.module('ContactApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
    List.Controller = {
        listContacts: function(){
            var contacts = ContactManager.request('contact:entities');

            var contactView = new ContactManager.ContactApp.List.Contacts({collection: contacts});
            ContactManager.mainRegion.show(contactView);
        }
    }
});
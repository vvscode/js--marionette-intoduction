ContactManager.module('ContactsApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
        listContacts: function () {
            var contacts = ContactManager.request('contact:entities');

            var contactsListView = new ContactManager.ContactApp.List.Contacts({collection: contacts});

            contactsListView.on('itemview:contact:delete', function (childView, model) {
                contacts.remove(model);
            });

            contactsListView.on('itemview:contact:highlighting:toggled', function (childView, model) {
                console.log("Highlighting toggled on model: ", model.toJSON());
            });

            contactsListView.on('itemview:contact:show', function (childView, model) {
                ContactManager.trigger('contacts:show', model.get('id'));
            });

            ContactManager.mainRegion.show(contactsListView);
        }
    }
});
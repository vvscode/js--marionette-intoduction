ContactManager.module('ContactsApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
        listContacts: function () {
            var loadingView = new ContactManager.Common.Views.Loading({
                title: 'Load list'
            });
            ContactManager.mainRegion.show(loadingView);

            var contactsPromise = ContactManager.request('contact:entities');

            $.when(contactsPromise).done(function(contacts){
                var contactsListView = new ContactManager.ContactApp.List.Contacts({collection: contacts});

                contactsListView.on('itemview:contact:delete', function (childView, model) {
                    model.destroy();
                });

                contactsListView.on('itemview:contact:highlighting:toggled', function (childView, model) {
                    console.log("Highlighting toggled on model: ", model.toJSON());
                });

                contactsListView.on('itemview:contact:show', function (childView, model) {
                    ContactManager.trigger('contact:show', model.get('id'));
                });

                ContactManager.mainRegion.show(contactsListView);
            });
        }
    }
});
define(['app'], function(ContactManager){
    ContactManager.module('ContactsApp', function (ContactsApp, ContactManager, Backbone, Mationetter, $, _) {
        ContactsApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'contacts(?filter=:criterion)': 'listContacts',
                'contacts/:id': 'showContact',
                'contacts/:id/edit': 'editContact',
            }
        });

        var API = {
            listContacts: function (criterion) {
                require(['apps/contacts/list/list_controller'], function(ListController){
                    ListController.listContacts(criterion);
                    ContactManager.execute('set:active:header','contacts');
                });
            },

            showContact: function (id) {
                ContactsApp.Show.Controller.showContact(id);
                ContactManager.execute('set:active:header','contacts');
            },

            editContact: function(id){
                ContactsApp.Edit.Controller.editContact(id);
                ContactManager.execute('set:active:header','contacts');
            }
        }

        ContactManager.on('contacts:list', function () {
            ContactManager.navigate('contacts');
            API.listContacts();
        });

        ContactManager.on('contact:show', function (id) {
            ContactManager.navigate('contacts/' + id);
            API.showContact(id);
        });

        ContactManager.on('contact:edit', function (id) {
            debugger;
            ContactManager.navigate('contacts/' + id + '/edit');
            API.editContact(id);
        });

        ContactManager.addInitializer(function () {
            new ContactsApp.Router({
                controller: API
            })
        });

        ContactManager.on('contacts:filter', function(criterion){
            if(criterion){
                ContactManager.navigate('contacts?filter=' + criterion);
            } else {
                ContactManager.navigate('contacts');
            }
        })
    });

    return ContactManager.ContactsApp;
});

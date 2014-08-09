ContactManager.module('ContactsApp', function (ContactsApp, ContatcManager, Backbone, Mationetter, $, _) {
    ContactsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'contacts(?filter=:criterion)': 'listContacts',
            'contacts/:id': 'showContact',
            'contacts/:id/edit': 'editContact',
        }
    });

    var API = {
        listContacts: function (criterion) {
            ContactsApp.List.Controller.listContacts(criterion);
        },

        showContact: function (id) {
            ContactsApp.Show.Controller.showContact(id);
        },

        editContact: function(id){
            ContactsApp.Edit.Controller.editContact(id);
        }
    }

    ContatcManager.on('contacts:list', function () {
        ContatcManager.navigate('contacts');
        API.listContacts();
    });

    ContatcManager.on('contact:show', function (id) {
        ContatcManager.navigate('contacts/' + id);
        API.showContact(id);
    });

    ContatcManager.on('contact:edit', function (id) {
        ContatcManager.navigate('contacts/' + id + '/edit');
        API.editContact(id);
    });

    ContatcManager.addInitializer(function () {
        new ContactsApp.Router({
            controller: API
        })
    });

    ContatcManager.on('contacts:filter', function(criterion){
        if(criterion){
            ContatcManager.navigate('contacts?filter=' + criterion);
        } else {
            ContactManager.navigate('contacts');
        }
    })
});
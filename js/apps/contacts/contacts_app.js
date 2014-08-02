ContactManager.module('ContactsApp', function (ContactsApp, ContatcManager, Backbone, Mationetter, $, _) {
    ContactsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'contacts': 'listContacts',
            'contacts/:id': 'showContact',
        }
    });

    var API = {
        listContacts: function () {
            ContactsApp.List.Controller.listContacts();
        },

        showContact: function (id) {
            ContactsApp.Show.Controller.showContact(id);
        }
    }

    ContatcManager.on('contacts:list', function () {
        ContatcManager.navigate('contacts');
        API.listContacts();
    });

    ContatcManager.on('contacts:show', function (id) {
        ContatcManager.navigate('contacts/' + id);
        API.showContact(id);
    });

    ContatcManager.addInitializer(function () {
        new ContactsApp.Router({
            controller: API
        })
    });
});
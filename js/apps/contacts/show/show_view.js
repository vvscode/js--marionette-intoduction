define([
'app',
'tpl!apps/contacts/show/templates/contact-view.tpl',
'tpl!apps/contacts/show/templates/missing-contact.tpl'
], function(ContactManager, contactTpl, missingTpl){
    ContactManager.module('ContactsApp.Show', function(Show, ContactManager, Backbone, Marionette, $, _){
        Show.Contact = Marionette.ItemView.extend({
            template: contactTpl,
            events: {
                'click a.js-list-contacts': 'onBackToListClick',
                'click a.js-edit': 'onEditClick',
            },
            onBackToListClick: function(ev){
                ev.stopImmediatePropagation();
                ContactManager.trigger('contacts:list');
            },
            onEditClick: function(ev){
                ev.preventDefault();
                this.trigger('contact:edit', this.model);
            }
        });

        Show.MissingContact = Show.Contact.extend({
            template: missingTpl
        })
    });

    return ContactManager.ContactsApp.Show;
})

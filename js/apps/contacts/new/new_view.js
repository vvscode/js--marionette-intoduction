define(['app', 'apps/contacts/common/views'], function(ContactManager, CommonViews){
    ContactManager.module('ContactsApp.New.View', function(View, ContactManager, Backbone, Marionette, $, _){
        View.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({
            title: 'New contact',
            onRender: function(){
                this.$('.js-submit').text('Create contact');
            }
        })
    });

    return ContactManager.ContactsApp.New.View;
});


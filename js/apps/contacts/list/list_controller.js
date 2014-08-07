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

                contactsListView.on('itemview:contact:edit', function(childView, model){
                    var view = new ContactManager.ContactsApp.Edit.Contact({
                        model: model,
                        asModal: true
                    });

                    view.on('form:submit', function(data){
                       if(model.save(data)){
                            childView.render();
                           ContactManager.dialogRegion.close();
                           childView.flash('success');
                       } else {
                           view.triggerMethod('form:data:invalid', model.validationError);
                       }
                    });

                    ContactManager.dialogRegion.show(view);
                });

                ContactManager.mainRegion.show(contactsListView);
            });
        }
    }
});
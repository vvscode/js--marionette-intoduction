ContactManager.module('ContactsApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
        listContacts: function () {
            var loadingView = new ContactManager.Common.Views.Loading({
                title: 'Load list'
            });
            ContactManager.mainRegion.show(loadingView);

            var contactsPromise = ContactManager.request('contact:entities');

            var contactsListLayout = new ContactManager.ContactApp.List.Layout();
            var contactsListPanel = new ContactManager.ContactApp.List.Panel();

            $.when(contactsPromise).done(function(contacts){
                var contactsListView = new ContactManager.ContactApp.List.Contacts({collection: contacts});

                contactsListLayout.on('show', function(){
                   contactsListLayout.panelRegion.show(contactsListPanel);
                    contactsListLayout.contactsRegion.show(contactsListView);
                });

                contactsListPanel.on('contact:new', function(){
                   var newContact = new ContactManager.Entities.Contact();

                    var view = new ContactManager.ContactsApp.New.Contact({
                       model: newContact,
                        asModal: true
                    });

                    view.on('form:submit', function(data){
                        var highestId = contacts.max(function(c){ return c.id});
                        highestId = highestId.get('id');
                        data.id = highestId + 1;

                        if(newContact.save(data)){
                            contacts.add(newContact);
                            ContactManager.dialogRegion.close();
                            contactsListView.children.findByModel(newContact).flash('success');
                        } else {
                            view.triggerMethod('form:data:invalid', newContact.validationError);
                        }
                    });

                    ContactManager.dialogRegion.show(view);
                });

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

                ContactManager.mainRegion.show(contactsListLayout);
            });
        }
    }
});
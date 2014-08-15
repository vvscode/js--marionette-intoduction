define([
'app',
'common/views',
'apps/contacts/edit/edit_view',
'apps/contacts/show/show_view',
'entities/contact'
],
function(ContactManager, CommonViews, EditViews, ShowView){
    ContactManager.module('ContactsApp.Edit', function(Edit, ContactManager, Backbone, Marionette, $, _){
        Edit.Controller = {
            editContact: function(id){
                var loadingView = new CommonViews.Loading({
                    title: 'Before editing delay'
                });

                ContactManager.mainRegion.show(loadingView);

                var fetchingContact = ContactManager.request('contact:entity', id);
                $.when(fetchingContact).done(function(contact){
                    var view;
                    if(!!contact){
                        view = new EditViews.Contact({
                            model: contact
                        });

                        view.on('form:submit', function(data){
                            if(contact.save(data)){
                                ContactManager.trigger('contact:show', contact.get('id'));
                            } else {
                                view.triggerMethod('form:data:invalid', contact.validationError);
                            }


                        })
                    } else {
                        view = new ShowView.MissingContact();
                    }

                    ContactManager.mainRegion.show(view);
                });
            }
        }
    });

    return ContactManager.ContactsApp.Edit.Controller;
});


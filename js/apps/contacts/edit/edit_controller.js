ContactManager.module('ContactsApp.Edit', function(Edit, ContactManager, Backbone, Marionette, $, _){
   Edit.Controller = {
       editContact: function(id){
           var loadingView = new ContactManager.Common.Views.Loading({
               title: 'Before editing delay'
           });

           ContactManager.mainRegion.show(loadingView);

           var fetchingContact = ContactManager.request('contact:entity', id);
           $.when(fetchingContact).done(function(contact){
                var view;
               if(!!contact){
                   view = new Edit.Contact({
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
                   view = new ContactManager.ContactsApp.Show.MissingContact();
               }

               ContactManager.mainRegion.show(view);
           });
       }
   }
});
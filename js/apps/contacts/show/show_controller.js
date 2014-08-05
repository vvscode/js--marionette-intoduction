ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
   Show.Controller = {
       showContact: function(id){
           var loadingView = new ContactManager.Common.Views.Loading({
               title: 'Load contact'
           });
           ContactManager.mainRegion.show(loadingView);

           var promise = ContactManager.request('contact:entity', id);

           $.when(promise).done(function(contact){
               if(!!contact){
                   var contactView = new Show.Contact({
                       model: contact
                   });

                   contactView.on('contact:edit', function(contact){
                      ContactManager.trigger('contact:edit', contact.get('id'));
                   });
               } else {
                   var contactView = new Show.MissingContact();
               }

               ContactManager.mainRegion.show(contactView);
           });
       }
   }
});
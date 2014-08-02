ContactManager.module("ContactsApp.Show", function(Show, ContactManaget, Backbone, Marionette, $, _){
   Show.Controller = {
       showContact: function(id){
           var contacts = ContactManaget.request('contact:entities');
           var model = contacts.get(id);
           var contactView = new Show.Contact({
               model: model
           });

           ContactManaget.mainRegion.show(contactView);
       }
   }
});
ContactManager.module("ContactsApp.Show", function(Show, ContactManaget, Backbone, Marionette, $, _){
   Show.Controller = {
       showContact: function(id){
           var contacts = ContactManaget.request('contact:entities');
           var model = ContactManaget.request('contact:entity', id);

           if(!!model){
               var contactView = new Show.Contact({
                   model: model
               });
           } else {
               var contactView = new Show.MissingContact();
           }


           ContactManaget.mainRegion.show(contactView);
       }
   }
});
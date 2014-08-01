ContactManager.module("ContactsApp.Show", function(Show, ContactManaget, Backbone, Marionette, $, _){
   Show.Controller = {
       showContact: function(model){
           var contactView = new Show.Contact({
               model: model
           });

           ContactManaget.mainRegion.show(contactView);
       }
   }
});
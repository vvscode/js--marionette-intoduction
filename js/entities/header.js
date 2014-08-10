ContactManager.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _){
   Entities.Header = Backbone.Model.extend({
       initialize: function(){
           var selectable = new Backbone.Picky.Selectable(this);
           _.extend(this, selectable);
       }
   });

    Entities.HeaderCollection = Backbone.Collection.extend({
        model: Entities.Header,
        initialize: function(){
            var singleSelect = new Backbone.Picky.SingleSelect(this);
            _.extend(this, singleSelect);
        }
    });

    var initializeHeaders =  function(){
        Entities.headers = new Entities.HeaderCollection([
            {name: 'Contacts', url: 'contacts'},
            {name: 'About', url: 'about'}
        ]);
    }

    var API = {
        getHeaders: function(){
            if(!Entities.headers){
                initializeHeaders();
            }
            return Entities.headers;
        }
    }

    ContactManager.reqres.setHandler('header:entities', function(){
        return API.getHeaders();
    });
});
ContactManager.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _){
    Entities.Contact = Backbone.Model.extend({
        defaults: {
            firstName: '',
            lastName: '',
            phone: 'No phone number!'
        }
    });

    Entities.ContactCollection = Backbone.Collection.extend({
        model: Entities.Contact,
        comparator: function (a) {
            return a.get('firstName') + ' ' + a.get('lastName');
        }
    });

    var contacts;

    var initializeContacts = function() {
        contacts = new Entities.ContactCollection([
            {id: 1, firstName: 'aa', lastName: 'rr', phone: '+111'},
            {id: 2, firstName: 'aa', lastName: 'dd', phone: '+222'},
            {id: 3, firstName: 'bb', lastName: 'ee'},
            {id: 4, firstName: 'bb', lastName: 'bb', phone: '+444444'}
        ]);
    }

    var API = {
        getContactEntities: function(){
            if(contacts === undefined){
                initializeContacts();
            }
            return contacts;
        }
    };

    ContactManager.reqres.setHandler('contact:entities', function(){
        return API.getContactEntities();
    })
});
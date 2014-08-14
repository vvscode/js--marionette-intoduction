define(['app', 'apps/config/storage/localstorage'], function(ContactManager){
    ContactManager.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _){
        Entities.Contact = Backbone.Model.extend({
            urlRoot: 'contacts',
            defaults: {
                firstName: '',
                lastName: '',
                phone: ''
            },
            validate: function(attrs, options){
                var errors = {};

                if(! attrs.firstName ){
                    errors.firstName = 'Can\'t be blank';
                } else if (attrs.firstName.length < 2 ){
                    errors.firstName = 'Too short';
                }

                if(!attrs.lastName){
                    errors.lastName = 'Can\'t be blank';
                }

                if(!_.isEmpty(errors)){
                    return errors;
                }
            }
        });

        Entities.configureStorage(Entities.Contact);

        Entities.ContactCollection = Backbone.Collection.extend({
            url: 'contacts',
            model: Entities.Contact,
            comparator: function (a) {
                return a.get('firstName') + ' ' + a.get('lastName');
            }
        });

        Entities.configureStorage(Entities.ContactCollection);


        var initializeContacts = function() {
            var contacts = new Entities.ContactCollection([
                {id: 1, firstName: 'aa', lastName: 'rr', phone: '+111'},
                {id: 2, firstName: 'aa', lastName: 'dd', phone: '+222'},
                {id: 3, firstName: 'bb', lastName: 'ee'},
                {id: 4, firstName: 'bb', lastName: 'bb', phone: '+444444'}
            ]);

            contacts.forEach(function(contact){
                contact.save();
            });

            return contacts;
        }

        var API = {
            getContactEntities: function(){
                var contacts = new Entities.ContactCollection();
                var defer = $.Deferred();
                setTimeout(function(){
                    contacts.fetch({
                        success: function(data){
                            defer.resolve(data);
                        }
                    });
                }, 500);


                var promise = defer.promise();
                $.when(promise).done(function(contacts){
                    if(contacts.length === 0){
                        var models = initializeContacts();
                        contacts.reset(models);
                    }
                });
                return promise;
            },

            getContactEntity: function(id){
                var contact = new Entities.Contact({id: id});
                var defer = $.Deferred();
                setTimeout(function(){
                    contact.fetch({
                        success: function(data){
                            defer.resolve(data);
                        },
                        error: function(){
                            defer.resolve(undefined);
                        }
                    });
                }, 200);

                return defer.promise( );
            }
        };

        ContactManager.reqres.setHandler('contact:entities', function(){
            return API.getContactEntities();
        });

        ContactManager.reqres.setHandler('contact:entity', function(id){
            return API.getContactEntity(id);
        });

        ContactManager.reqres.setHandler('contact:entity:new', function(){
            return new Entities.Contact();
        })
    });

    return;
});

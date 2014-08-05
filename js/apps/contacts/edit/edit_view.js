ContactManager.module('ContactsApp.Edit', function(Edit, ContactManager, Backbone, Marionette, $, _){
    Edit.Contact = Marionette.ItemView.extend({
        template: '#contact-form',
        events: {
            'click button.js-submit': 'onSubmitClick'
        },
        onSubmitClick: function(ev){
            console.log('onSubmitClick');
            ev.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('form:submit', data);
        }
    })
})
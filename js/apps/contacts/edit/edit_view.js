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
        },
        initialize: function(){
           this.title = 'Edit ' + this.model.get('firstName');
           this.title += ' ' + this.model.get('lastName');
        },
        onRender: function(){
            if(!this.options.asModal){
                var $title = $('<h1>', {text: this.title});
                this.$el.prepend($title);
            }
        },
        onShow: function(){
            if(this.options.asModal){
                this.$el.dialog({
                    modal: true,
                    title: this.title,
                    width: 600
                });
            }
        },
        onFormDataInvalid: function(errors){
            var self = this;
            var $view = this.$el;

            var clearFormErrors = function(){
                var $form = $view.find('form');
                $form.find('.help-inline.error').remove();
                $form.find('.control-group.error').removeClass('error');
            }

            var markErrors = function(value, key){
                var $controlGroup = self.$el.find('#contact-'+key).parent();
                var $errorEl = $('<span>', {
                    class: 'help-inline error',
                    text: value
                });
                $controlGroup.append($errorEl).addClass('error');
            }

            clearFormErrors();
            _.each(errors, markErrors);
        }
    })
})
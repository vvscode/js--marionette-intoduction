ContactManager.module('ContactsApp.Common.Views', function(Views, ContactManager, Backbone, Marionette, $, _){
    Views.Form = Marionette.ItemView.extend({
        template: '#contact-form',
        events: {
            'click button.js-submit': 'onSubmitClick'
        },
        onSubmitClick: function (ev) {
            ev.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('form:submit', data);
        },
        onRender: function () {
            if (!this.options.asModal) {
                var $title = $('<title>', {test: this.titile});
                this.$el.prepend($title);
            }
        },
        onShow: function () {
            if (this.options.asModal) {
                this.$el.dialog({
                    modal: true,
                    title: this.title,
                    width: 500
                });
            }
        },
        onFormDataInvalid: function (errors) {
            var $view = this.$el;

            var clearFormErrors = function () {
                var $form = $view.find('form');
                $form.find('.help-inline.error').remove();
                $form.find('.control-group.error').removeClass('error');
            }

            var markErrros = function (value, key) {
                var $controlGroup = $view.find('#contact-' + key).parent();
                var $errorEl = $('<span>', {
                    class: 'help-inline error',
                    text: value
                });
                $controlGroup.append($errorEl).addClass('error');
            }

            clearFormErrors();
            _.each(errors, markErrros);
        }
    });
});
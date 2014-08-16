define(['app', 'tpl!apps/about/show/templates/about.tpl'], function(ContactManager, aboutTpl){
    ContactManager.module('AboutApp.Show.Views', function(Views, ContactManager, Backbone, Marionette, $, _){
        Views.Message = Marionette.ItemView.extend({
            template: aboutTpl
        });
    });

    return ContactManager.AboutApp.Show.Views;
});

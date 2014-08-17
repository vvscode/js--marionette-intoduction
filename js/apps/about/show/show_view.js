define(['app', 'tpl!apps/about/show/templates/about.tpl'], function(ContactManager, aboutTpl){
    return {
        Message: Marionette.ItemView.extend({
            template: aboutTpl
        })
    }
});

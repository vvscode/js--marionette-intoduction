define([
    'app',
    'tpl!apps/header/list/templates/header.tpl',
    'tpl!apps/header/list/templates/link.tpl'],
    function(
        ContactManager,
        headerTpl,
        linkTpl){
    ContactManager.module('HeaderApp.List.Views', function(Views, ContactManager, Backbone, Marionette, $, _){
        Views.Header = Marionette.ItemView.extend({
            template: linkTpl,
            tagName: 'li',
            events: {
                'click a': 'navigate'
            },
            navigate: function(ev){
                ev.preventDefault();
                this.trigger('navigate', this.model);
            },
            onRender: function(){
                if(this.model.selected){
                    this.$el.addClass('active');
                }
            }
        });

        Views.Headers = Marionette.CompositeView.extend({
            template: headerTpl,
            className: 'navbar navbar-default',
            itemView: Views.Header,
            itemViewContainer: 'ul',
            events: {
                'click a.navbar-brand': 'onBrandClick'
            },
            onBrandClicked: function(ev){
                ev.preventDefault();
                this.trigger('brand:clicked');
            }
        });
    });

    return ContactManager.HeaderApp.List.Views;
});

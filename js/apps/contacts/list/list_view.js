ContactManager.module('ContactApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
    List.Contact = Backbone.Marionette.ItemView.extend({
        template: "#contact-list-item",
        tagName: 'tr',
        events: {
            'click': 'highlightName',
            'click .js-delete': 'onDeleteClick',
            'click .js-show': 'onShowClick',
            'click .js-edit': 'onEditClick',
        },
        flash: function(cssClass){
            var $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function(){
                setTimeout(function(){
                    $view.toggleClass(cssClass);
                }, 500);
            });
        },
        highlightName: function(){
            this.$el.toggleClass('warning');
            this.trigger('contact:highlighting:toggled', this.model);
        },
        onDeleteClick: function(ev){
            ev.stopPropagation();
            this.trigger('contact:delete', this.model);
        },
        onShowClick: function(ev){
            ev.stopPropagation();
            ev.preventDefault();
            this.trigger('contact:show', this.model);
        },
        onEditClick: function(ev){
            ev.preventDefault();
            ev.stopPropagation();
            this.trigger('contact:edit', this.model);
        },
        remove: function(){
            this.$el.fadeOut(function(){
                $(this).remove();
            });
        },
    });

    List.Contacts =  Backbone.Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'table table-hover',
        itemView: List.Contact,
        itemViewContainer: 'tbody',
        template: '#contact-list',
        onItemviewContactDelete: function(){
            this.$el.fadeOut(1000, function(){
               $(this).fadeIn(1000);
            });
        }
    });
});
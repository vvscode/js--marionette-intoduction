define(['app',
'tpl!apps/contacts/list/templates/layout.tpl',
'tpl!apps/contacts/list/templates/list.tpl',
'tpl!apps/contacts/list/templates/list_item.tpl',
'tpl!apps/contacts/list/templates/none.tpl',
'tpl!apps/contacts/list/templates/panel.tpl'
], function(ContactManager, layoutTpl, listTpl, listItemTpl, noneTpl, panelTpl){
    ContactManager.module('ContactsApp.List.View', function(View, ContactManager, Backbone, Marionette, $, _){
        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,
            regions: {
                panelRegion: '#panel-region',
                contactsRegion: '#contacts-region'
            }
        });

        View.Panel = Marionette.ItemView.extend({
            template: panelTpl,
            triggers: {
                'click button.js-new': 'contact:new'
            },
            events: {
                'click button.js-filter': 'onFilterClick'
            },
            ui: {
                criterion: 'input.js-filter-criterion'
            },
            onFilterClick: function(ev){
                ev.preventDefault();
                var criterion = $(this.ui.criterion).val();
                this.trigger('contacts:filter', criterion);
            },
            onSetFilterCriterion: function(criterion){
                $(this.ui.criterion).val(criterion);
            }
        });

        View.Contact = Backbone.Marionette.ItemView.extend({
            template: listItemTpl,
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

        var NoContactsView = Marionette.ItemView.extend({
            template: noneTpl,
            tagName: 'tr',
            className: 'alert'
        });

        View.Contacts =  Backbone.Marionette.CompositeView.extend({
            tagName: 'table',
            className: 'table table-hover',
            itemView: View.Contact,
            emptyView: NoContactsView,
            itemViewContainer: 'tbody',
            template: listTpl,
            initialize: function(){
                this.listenTo(this.collection, 'reset', function(){
                    this.appendHtml = function(collectionView, itemView, index){
                        collectionView.$el.append(itemView.el);
                    }
                });
            },
            onItemviewContactDelete: function(){
                this.$el.fadeOut(1000, function(){
                    $(this).fadeIn(1000);
                });
            },
            onCompositecollectionRendered: function(){
                this.appendHtml = function(collectionView, itemView, index){
                    collectionView.$el.prepend(itemvie.el);
                }
            }
        });
    });

    return ContactManager.ContactsApp.List.View;
});

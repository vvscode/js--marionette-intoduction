ContactManager.module('HeaderApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
    List.Header = Marionette.ItemView.extend({
        template: '#header-link',
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

    List.Headers = Marionette.CompositeView.extend({
        template: '#header-template',
        className: 'navbar navbar-default',
        itemView: List.Header,
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
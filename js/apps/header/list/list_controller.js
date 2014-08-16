define(['app', 'apps/header/list/list_view'], function(ContactManager, HeaderListViews){
    ContactManager.module('HeaderApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
        List.Controller = {
            listHeader: function(){
                require(['entities/header'], function(){
                var links = ContactManager.request('header:entities');
                var headers = new HeaderListViews.Headers({collection: links});

                headers.on('brand:clicked', function(){
                    ContactManager.trigger('contacts:list');
                });

                headers.on('itemview:navigate', function(childView, model){
                    var url = model.get('url');
                    if(url == 'contacts'){
                        ContactManager.trigger('contacts:list');
                    } else if(url == 'about'){
                        ContactManager.trigger('about:show');
                    } else {
                        throw 'Now such sub-application ' + url;
                    }
                });

                ContactManager.headerRegion.show(headers);
                });
            },
            setActiveHeader: function(headerUrl){
                require(['entities/header'], function(){
                    var links = ContactManager.request('header:entities');
                    var headerToSelect = links.find(function(header){
                        return header.get('url') === headerUrl;
                    });
                    headerToSelect.select();
                    links.trigger('reset');
                });
            }
        }
    });

    return ContactManager.HeaderApp.List.Controller;
});


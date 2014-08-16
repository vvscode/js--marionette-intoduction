define(['app', 'apps/about/show/show_view'], function(ContactManager, ShowView){
    ContactManager.module('AboutApp.Show', function(Show, ContactManager, Backbone, Mationette, $, _){
        Show.Controller = {
            showAbout: function(){
                var view = new ShowView.Message();
                ContactManager.mainRegion.show(view);
            }
        }
    });

    return ContactManager.AboutApp.Show.Controller;
});


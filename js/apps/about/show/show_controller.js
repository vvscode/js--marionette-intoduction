ContactManager.module('AboutApp.Show', function(Show, ContactManager, Backbone, Mationette, $, _){
    Show.Controller = {
        showAbout: function(){
            var view = new Show.Message();
            ContactManager.mainRegion.show(view);
        }
    }
});
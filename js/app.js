var ContactManager = new Marionette.Application;

ContactManager.addRegions({
    mainRegion: "#main-region"
});

ContactManager.on('initialize:after', function () {
    ContactManager.ContactApp.List.Controller.listContacts();
});
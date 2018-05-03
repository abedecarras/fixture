var groups = ["Saab","Volvo","BMW"];
var str='hola';

var groupsCallback = function (response) {
    // test();
    console.log(response);

};



var _initScript = function () {
    console.log('initScript-----------------------------');
    var services = new ProdeServicesTEST();
    console.log('getGroups:');
    this.groups = services.getGroups(1, groupsCallback);

    console.log('getGroupMatchs:');
    services.getGroupMatchs(1, groupsCallback);

    test();

};





document.addEventListener("DOMContentLoaded", _initScript);


var test = function () {
  document.getElementById('grupoA').innerHTML = groupsCallback();
}

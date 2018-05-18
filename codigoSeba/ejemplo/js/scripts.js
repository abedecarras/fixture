var printResult = function(response) {
    document.getElementsByTagName('textarea')[0].innerHTML = JSON.stringify(response);
};

var services = new ProdeServices();
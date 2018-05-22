let services = new ProdeServices();

var printResult = function(response) {
    // document.getElementsByTagName('textarea')[0].innerHTML = JSON.stringify(response);
    // console.log(JSON.stringify(response));
    console.log('printResult');
    console.log(response);
};

var apostar = function(idGroup, idMatch) {
  let goalsL = document.getElementById('lGoal').value;
  let goalsF = document.getElementById('fGoal').value;

  console.log('apostar');
  console.log();
  console.log('local:',goalsL);
  console.log('visita:',goalsF);

  services.setMatchResult(idMatch, goalsL, goalsF, 0, 0, printResult);
  // services.getGroupMatchs(idGroup, printResult);
}

var cambiarFecha = function(idMatch) {
  let fecha = document.getElementById('date').value;
  // console.log('fecha:',fecha);
  console.log('idMatch:',idMatch);
  console.log('fecha input:',fecha);
  console.log('fecha:','2018-05-20 22:00:00');
  services.setMatchDate(idMatch, fecha, printResult);
  // services.setMatchDate(7, '2018-05-01 15:00:00', printResult);
  // services.setMatchDate(idMatch, fecha, printResult);
}


  var showAdmin = function(response) {
    console.log('profile:',response);
    // console.log('isAdmin:',response.isAdmin);
    if (!response.isAdmin) {
      var list = document.querySelectorAll( '.input-admin' );
        for (var item of list) {
          item.className = 'hide';
        }
    }
  }

  var _initScript = function() {
    // let services = new ProdeServices();
    console.log("DOM fully loaded and parsed");
    services.getProfile(showAdmin);
  }

  document.addEventListener("DOMContentLoaded", _initScript);

let services = new ProdeServices();

var printResult = function(response) {
    // document.getElementsByTagName('textarea')[0].innerHTML = JSON.stringify(response);
    // console.log(JSON.stringify(response));
    console.log('printResult');
    console.log(response);
};

var apostar = function(idGroup, idMatch) {
  console.log('apostar');
  let goalsL = document.getElementById(`lGoal${idMatch}`).value;
  let goalsF = document.getElementById(`fGoal${idMatch}`).value;

  console.log('local:',goalsL);
  console.log('visita:',goalsF);

  services.setMatchResult(idMatch, goalsL, goalsF, 0, 0, printResult);
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

  var loadResult = function(response) {
    console.log('loadResult');
    console.log(response);
    matches = response;

    for (item of matches) {
      console.log('id:',item.id);
      console.log('local team:',item.localTeam);
      console.log('foreign team:',item.foreignTeam);
      console.log('localGoalUser',item.localGoalsUser);
      console.log('foreignGoalUser',item.foreignGoalsUser);
      if (item.localGoalsUser !=null) {
        document.getElementById(`lGoal${item.id}`).value = item.localGoalsUser;
      }
      if (item.foreignGoalsUser !=null) {
        document.getElementById(`fGoal${item.id}`).value = item.foreignGoalsUser;
      }
    }
  }

  var checkResult = function(idMatch) {
    console.log('checkResult');
    services.getGroupMatchs(idMatch, loadResult);
  }


  var _initScript = function() {
    // let services = new ProdeServices();
    console.log("DOM fully loaded and parsed");
    services.getProfile(showAdmin);
  }

  document.addEventListener("DOMContentLoaded", _initScript);

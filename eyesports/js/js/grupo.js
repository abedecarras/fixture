let services = new ProdeServices();

var printResult = function(response) {
    // document.getElementsByTagName('textarea')[0].innerHTML = JSON.stringify(response);
    // console.log(JSON.stringify(response));
    console.log('printResult');
    console.log(response);
};

var apostar = function(idGroup, idMatch) {
  console.log('apostar');
  let goalsL = document.getElementById(`lGoal${idMatch}`);//.value;
  let goalsF = document.getElementById(`fGoal${idMatch}`);//.value;
  // let l = document.getElementById(`lGoal${idMatch}`).style.color = 'blue';
  // let f = document.getElementById(`fGoal${idMatch}`).style.color = 'blue';
  goalsL.style.color = 'blue';
  goalsF.style.color = 'blue';
  // goalsL.className = 'sent';
  // goalsF.className = 'sent';

  services.setMatchResult(idMatch, goalsL.value, goalsF.value, 0, 0, printResult);
}

var cambiarFecha = function(idMatch) {
  let fecha = document.getElementById('date').value;
  // console.log('fecha:',fecha);
  // console.log('idMatch:',idMatch);
  console.log('fecha input:',fecha);
  // console.log('fecha:','2018-05-20 22:00:00');
  services.setMatchDate(idMatch, fecha, printResult);
  // services.setMatchDate(idMatch, fecha, printResult);
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
    checkResult(1);
  }

  var loadResult = function(response) {
    console.log(response);
    matches = response;
    for (item of matches) {
      if (item.localGoalsUser !=null) {
        document.getElementById(`lGoal${item.id}`).value = item.localGoalsUser;
      }
      if (item.foreignGoalsUser !=null) {
        document.getElementById(`fGoal${item.id}`).value = item.foreignGoalsUser;
      }
      if (item.localGoalsMatch !=null) {
        let div = document.getElementById(`final${item.id}`);
        document.getElementById(`p-local${item.id}`).innerHTML = item.localGoalsMatch;
        document.getElementById(`p-foreign${item.id}`).innerHTML = item.foreignGoalsMatch;
        div.className = 'f-show';
      }
    }
  }

  var checkResult = function(idGroup) {
    console.log('checkResult');
    services.getGroupMatchs(idGroup, loadResult);
  }


  var _initScript = function() {
    // let services = new ProdeServices();
    console.log("DOM fully loaded and parsed");
    services.getProfile(showAdmin);
  }

  document.addEventListener("DOMContentLoaded", _initScript);

let services = new ProdeServices();

function printResult(response) {
    // document.getElementsByTagName('textarea')[0].innerHTML = JSON.stringify(response);
    // console.log(JSON.stringify(response));
    console.log('printResult');
    console.log(response);
};

function apostar(idGroup, idMatch) {
  console.log('apostar');
  let goalsL = document.getElementById(`lGoal${idMatch}`);//.value;
  let goalsF = document.getElementById(`fGoal${idMatch}`);//.value;
  // $('lGoal'+ idMatch) -------------------------> jquery
  // let l = document.getElementById(`lGoal${idMatch}`).style.color = 'blue';
  // let f = document.getElementById(`fGoal${idMatch}`).style.color = 'blue';
  goalsL.style.color = 'blue';
  goalsF.style.color = 'blue';
  // goalsL.className = 'sent';
  // goalsF.className = 'sent';

  services.setMatchResult(idMatch, goalsL.value, goalsF.value, 0, 0, printResult);
}

 function cambiarFecha(idMatch) {
  let fecha = document.getElementById(`date${idMatch}`).value;
  // console.log('fecha:',fecha);
  // console.log('idMatch:',idMatch);
  console.log('fecha input:',fecha);
  // console.log('fecha:','2018-05-20 22:00:00');
  services.setMatchDate(idMatch, fecha, printResult);
  // services.setMatchDate(idMatch, fecha, printResult);
  // services.setMatchDate(7, '2018-05-01 15:00:00', printResult);
  // services.setMatchDate(idMatch, fecha, printResult);
}


  function showAdmin(response) {
    console.log('profile:',response);
    // console.log('isAdmin:',response.isAdmin);
    if (!response.isAdmin) {
      var list = document.querySelectorAll( '.input-admin' );
        for (var item of list) {
          item.className = 'hide';
        }
    }

    services.getGroups(0, showGroup);

    // checkResult(2);
  }

  function showGroup(response) {
    console.log('showGroup');
    console.log('grupos:',response);
    // console.log(response[0].table);
    let group;
    for (var i = 0; i < response.length; i++) {
      // console.log(`grupo ${i+1}:`,response[i]);
      if (response[i].name == document.getElementById('group').innerHTML) {
        group = i;
      }
    }

    let team = response[group].table;
    let idGroup = response[group].id;
    console.log('grupo:',response[group].id);
    console.log(team);

    checkResult(idGroup);
  }

  function checkResult(idGroup) {
    console.log('checkResult');
    //idGroup dinamico
    services.getGroupMatchs(idGroup, loadResult);
  }

   function loadResult(response) {
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

      // if ((new Date(item.matchDate) - 30*60*1000 - new Date() < 0)) { //si falta menos de media hora
      //   document.getElementById(`apostar${item.id}`).disabled = true;
      // }
    }

    services.getGroups(0, showTable);
  }



  function showTable(response) {
    console.log('showTable');
    // console.log('response:',response);
    let group;
    for (var i = 0; i < response.length; i++) {
      // console.log(`grupo ${i+1}:`,response[i]);
      if (response[i].name == document.getElementById('group').innerHTML) {
        group = i;
      }
    }

    let teams = response[group].table;
    console.log(teams);
    for (var i = 3; i >= 0; i--) {
      console.log(teams[i]);
      let li = document.createElement('li');

      let pos = document.createElement('div');
      pos.textContent = i+1;
      pos.className = 'ec-cell';
      let team = document.createElement('div');
      team.textContent = teams[i].team;
      team.className = 'ec-cell';
      let points = document.createElement('div');
      points.textContent =  teams[i].won *3 + teams[i].draw;
      points.className = 'ec-cell';
      let won = document.createElement('div');
      won.textContent =  teams[i].won;
      won.className = 'ec-cell';
      let draw = document.createElement('div');
      draw.textContent =  teams[i].draw;
      draw.className = 'ec-cell';
      let lost = document.createElement('div');
      lost.textContent =  teams[i].lost;
      lost.className = 'ec-cell';
      let gf = document.createElement('div');
      gf.textContent =  teams[i].goalsF;
      gf.className = 'ec-cell';
      let gc = document.createElement('div');
      gc.textContent =  teams[i].goalsC;
      gc.className = 'ec-cell';

      li.appendChild(pos);
      li.appendChild(team);
      li.appendChild(points);
      li.appendChild(won);
      li.appendChild(draw);
      li.appendChild(lost);
      li.appendChild(gf);
      li.appendChild(gc);

      document.getElementById('0').appendChild(li);
    }
  }


  function _initScript() {
    // let services = new ProdeServices();
    console.log("DOM fully loaded and parsed");
    services.getProfile(showAdmin);
  }

  document.addEventListener("DOMContentLoaded", _initScript);

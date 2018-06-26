let services = new ProdeServices();
let matchs = new Array();

function printResult(response) {
    console.log('printResult');
    console.log(response);
};

function loadTeams(response) {
  // console.log('octavos');
  // console.log(response);

  let octavos = response;
  for (var i = 0; i < octavos.length; i++) {
    // let id = octavos[i].id;
    // services.getGroupMatchs(id, loadResult);
    matchs[i] = octavos[i];
    // console.log(matchs[i]);
  }
  services.getGroups(2, loadQuarter);
}

// function checkResult(idGroup) { //no se utiliza
//   services.getGroupMatchs(idGroup, loadResult);
// }

function loadResult(response) {
  console.log('matchs:');
  console.log(response);
  matches = response;
  for (item of matches) {
    let local = item.localTeam.substring(0,2) + item.localTeam.substring(item.localTeam.length-1, item.localTeam.length);
    // let local = item.localTeam.substring(0,3); //descomentar esta linea cuando esten cargados los equipos y borrar la de arriba!!!
    let foreign = item.foreignTeam.substring(0,2) + item.foreignTeam.substring(item.foreignTeam.length-1,item.foreignTeam.length);
    // let foreign = item.foreignTeam.substring(0,3); //descomentar esta linea cuando esten cargados los equipos y borrar la de arriba!!!

    let lteam = document.createElement('div');
    // lteam.textContent = item.localTeam;
    lteam.textContent = local;

    let fteam = document.createElement('div');
    // fteam.textContent = item.foreignTeam;
    fteam.textContent = foreign;

    console.log(`ID:${item.id}`);
    document.getElementById(`localKey${item.id}`).appendChild(lteam);
    document.getElementById(`foreignKey${item.id}`).appendChild(fteam);

    // document.getElementById(`titulo${item.id}`).textContent = `${item.localTeam} VS ${item.foreignTeam}`

    let lflag = document.querySelectorAll(`.lFlag${item.id}`);
    lflag[0].src = `images/flags/${item.localTeam}.png`;
    lflag[1].src = `images/flags/${item.localTeam}.png`;

    let fflag = document.querySelectorAll(`.fFlag${item.id}`);
    fflag[0].src = `images/flags/${item.foreignTeam}.png`;
    fflag[1].src = `images/flags/${item.foreignTeam}.png`;

    document.getElementById(`lteam${item.id}`).textContent = `${item.localTeam}`;
    document.getElementById(`fteam${item.id}`).textContent = `${item.foreignTeam}`;

    if (item.localGoalsUser !=null) {
      document.getElementById(`lGoal${item.id}`).value = item.localGoalsUser;
    }
    if (item.foreignGoalsUser !=null) {
      document.getElementById(`fGoal${item.id}`).value = item.foreignGoalsUser;
    }

  }
}

function apostar(idMatch) {
  console.log('apostar');
  let goalsL = document.getElementById(`lGoal${idMatch}`);//.value;
  let goalsF = document.getElementById(`fGoal${idMatch}`);//.value;
  console.log('lgoal:', goalsL.value);
  console.log('fgoal:', goalsF.value);
  // $('lGoal'+ idMatch) -------------------------> jquery
  // let l = document.getElementById(`lGoal${idMatch}`).style.color = 'blue';
  // let f = document.getElementById(`fGoal${idMatch}`).style.color = 'blue';
  goalsL.style.color = 'blue';
  goalsF.style.color = 'blue';
  // goalsL.className = 'sent';
  // goalsF.className = 'sent';

  services.setMatchResult(idMatch, goalsL.value, goalsF.value, 0, 0, printResult);
}

function loadQuarter(response) {
  let cuartos = response;
  let last = matchs.length;
  // console.log('ultimo:',last);
  for (var i = 0; i < cuartos.length; i++) {
    matchs[last+i] = cuartos[i];
    // console.log(matchs[last+i]);
    // console.log(cuartos[i].name);
  }

  services.getGroups(3, loadSemis);
}

function loadSemis(response) {
  let semis = response;
  let last = matchs.length;
  for (var i = 0; i < semis.length; i++) {
    matchs[last+i] = semis[i];
    // console.log(matchs[last+i]);
    // console.log(cuartos[i].name);
  }
  services.getGroups(4, loadFinal);
}

function loadFinal(response) {
  let final = response;
  let last = matchs.length;
  for (var i = 0; i < final.length; i++) {
    matchs[last+i] = final[i];
    // console.log(matchs[last+i]);
    // console.log(cuartos[i].name);
  }

  console.log(matchs);
  loadCuadro();
}

function loadCuadro() {
  for (var i = 0; i < matchs.length; i++) {
    let id = matchs[i].id;
    services.getGroupMatchs(id, loadResult);
  }
}


function _initScript() {
  console.log("DOM fully loaded and parsed");
  services.getGroups(1, loadTeams);
}


document.addEventListener("DOMContentLoaded", _initScript);

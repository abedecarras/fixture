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

    let lteam = document.createElement('div');
    lteam.textContent = item.localTeam;
    // lteam.className = 'gray-bg fl-right right-bullet';

    let fteam = document.createElement('div');
    fteam.textContent = item.foreignTeam;
    // fteam.className = 'gray-bg fl-right right-bullet';
    console.log(`ID:${item.id}`);
    document.getElementById(`localKey${item.id}`).appendChild(lteam);
    document.getElementById(`foreignKey${item.id}`).appendChild(fteam);

    document.getElementById(`titulo${item.id}`).textContent = `${item.localTeam} VS ${item.foreignTeam}`
    let lflag = document.getElementById(`lFlag${item.id}`);
    // console.log(`lFlag${item.id}`);
    lflag.src = `images/img/colombia.png`;
    lflag.src = `images/img/${item.localTeam}.png`;
    let fflag = document.getElementById(`fFlag${item.id}`);
    fflag.src = `images/img/belgica.png`;
    fflag.src = `images/img/${item.localTeam}.png`;

    let local = document.getElementById(`lteam${item.id}`).textContent = `${item.localTeam}`;
    let foreign = document.getElementById(`fteam${item.id}`).textContent = `${item.foreignTeam}`;

    if (item.localGoalsUser !=null) {
      document.getElementById(`lGoal${item.id}`).value = item.localGoalsUser;
    }
    if (item.foreignGoalsUser !=null) {
      document.getElementById(`fGoal${item.id}`).value = item.foreignGoalsUser;
    }

  }
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

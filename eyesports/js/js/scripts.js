var services = new ProdeServices();

// static lastInstance: Login;
// let username;
// let password;

var printResult = function(response) {
    document.getElementsByTagName('textarea')[0].innerHTML = JSON.stringify(response);
    console.log(JSON.stringify(response));
    console.log(response);
};

var showRanking = function(response) {

  let users = response;
  for (var i = 0; i < users.length; i++) {
    let li = document.createElement('li');

    let pos = document.createElement('div');
    pos.textContent = i+1;
    pos.className = 'ec-cell';
    let user = document.createElement('div');
    user.textContent = users[i].name;
    user.className = 'ec-cell';
    let company = document.createElement('div');
    company.textContent = users[i].bussiness;
    company.className = 'ec-cell';
    let score = document.createElement('div');
    score.textContent = users[i].score;
    score.className = 'ec-cell';

    li.appendChild(pos);
    li.appendChild(user);
    li.appendChild(company);
    li.appendChild(score);

    document.getElementById('0').appendChild(li);
  }

}

var validation = function(){
  let username = document.forms['myForm']['fname'].value;
  let password = document.forms['myForm']['fpassword'].value;

  // console.log(username);
  // console.log(password);

  services.login(username, password, loggedResponse);

}

var verRanking = function(){
  services.getRanking(printResult);
}

var loggedResponse = function(response) {
    // console.log(response.logged);
    if (response.logged){
      // console.log('logueado:',response);
      window.location.href="home.html";
      // services.getRanking(showRanking);
    }
    else {
      // console.log(response);
      // console.log('usuario o contraseña incorrecto');
    }
  }

  var apostar = function(idMatch, goalsL, goalsF){
    // let goalsL = document.getElementById('lGoal').value;
    // let goalsF = document.getElementById('fGoal').value;

    // services.setMatchResult(idMatch, goalsL, goalsF);

    // console.log('apostar');
    // console.log(idMatch);
    // console.log(goalsL);
    // console.log(goalsF);
  }

  var _initScript = function(){
    // console.log(username);
    // console.log(password);
    // services.login(username, password);
    services.getRanking(showRanking);
  }

  document.addEventListener("DOMContentLoaded", _initScript);

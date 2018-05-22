
var showRanking = function(response) {
  console.log('showRanking');
  console.log('response:',response);
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

var _initScript = function() {
  let services = new ProdeServices();
  //  $(document).ready(function(){
  //    this.users = services.getRanking(showRanking);
  //    console.log('ready');
  // });
  console.log("DOM fully loaded and parsed");
  services.getRanking(showRanking);
}

document.addEventListener("DOMContentLoaded", _initScript);

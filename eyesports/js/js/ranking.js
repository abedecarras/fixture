
function showRanking(response) {
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
    let location = document.createElement('div');
    location.textContent = users[i].location;
    location.className = 'ec-cell';
    let score = document.createElement('div');
    score.textContent = users[i].score;
    score.className = 'ec-cell';

    li.appendChild(pos);
    li.appendChild(user);
    li.appendChild(location);
    li.appendChild(score);

    document.getElementById('0').appendChild(li);
  }
}

function _initScript() {
  let services = new ProdeServices();

  // $(document).ready(function(){
  //    services.getRanking(showRanking);
  //    console.log('ready');
  // });
  console.log("DOM fully loaded and parsed");
  services.getRanking(showRanking);
}

// $( document ).ready(function() {
//     console.log( "ready!" );
// });
// $(document).ready(_initScript);
document.addEventListener("DOMContentLoaded", _initScript);

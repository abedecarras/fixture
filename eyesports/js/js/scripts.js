  var services = new ProdeServices();

  var printResult = function(response) {
      // document.getElementsByTagName('textarea')[0].innerHTML = JSON.stringify(response);
      // console.log(JSON.stringify(response));
      console.log('printResult');
      console.log(response);
  };

  var validation = function(){
    let username = document.forms['myForm']['fname'].value;
    let password = document.forms['myForm']['fpassword'].value;

    services.login(username, password, loggedResponse);
  }

  var loggedResponse = function(response) {
    console.log(response.logged);
    if (response.logged) {
      window.location.href="home.html";
    }
    else {
      console.log(response);
      console.log('usuario o contraseña incorrecto');
      let inputs = document.querySelectorAll('.input');
      for (var item of inputs) {
        // console.log(item);
        item.style.borderColor = '#8b0300';
      }
      document.querySelector('.error').className = 'e-show';
    }
  }

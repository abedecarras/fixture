

var groupsCallback = function (response) {
    // let equipos = response[0].table;
    console.log('equipos', response[0].table[0].team);
    console.log(response.length);

    for (var group = 0; group < 2; group++) {
      for (var team = 0; team < 4; team++) {
        let tr = document.createElement('tr');

        console.log('team:', team);
        console.log('group:', group);
        let equipo = document.createElement('td');
        equipo.innerHTML = response[group].table[team].team;
        let puntaje = document.createElement('td');
        puntaje.innerHTML = '-';
        let jugados = document.createElement('td');
        jugados.innerHTML = '-';
        let ganados = document.createElement('td');
        ganados.innerHTML = response[group].table[team].wons;
        let empatados = document.createElement('td');
        empatados.innerHTML = response[group].table[team].draws;
        let perdidos = document.createElement('td');
        perdidos.innerHTML = response[group].table[team].lost;
        let golesC = document.createElement('td');
        golesC.innerHTML = response[group].table[team].goalsC;
        let golesF = document.createElement('td');
        golesF.innerHTML = response[group].table[team].goalsF;
        tr.appendChild(equipo);
        tr.appendChild(puntaje);
        tr.appendChild(jugados);
        tr.appendChild(ganados);
        tr.appendChild(empatados);
        tr.appendChild(perdidos);
        tr.appendChild(golesC);
        tr.appendChild(golesF);

        document.getElementById(`grupo${group}`).appendChild(tr);
      }
    }


    // let fila = document.getElementById('grupoA');
    // fila.innerHTML = '';
    // for (var i = 0; i < 4; i++) {
    //
    //     fila.innerHTML += `<tr>
    //                            <td>${response[0].table[i].team}</td>
    //                            <td>-</td>
    //                            <td>-</td>
    //                            <td>${response[0].table[i].wons}</td>
    //                            <td>${response[0].table[i].draws}</td>
    //                            <td>${response[0].table[i].lost}</td>
    //                            <td>${response[0].table[i].goalsC}</td>
    //                            <td>${response[0].table[i].goalsF}</td>
    //                        </tr>`;
    // }
    //
    // fila = document.getElementById('grupoB');
    // console.log('fila:',fila);
    // fila.innerHTML = '';
    // for (var i = 0; i < 4; i++) {
    //
    //     fila.innerHTML += `<tr>
    //                            <td>${response[1].table[i].team}</td>
    //                            <td>-</td>
    //                            <td>-</td>
    //                            <td>${response[1].table[i].wons}</td>
    //                            <td>${response[1].table[i].draws}</td>
    //                            <td>${response[1].table[i].lost}</td>
    //                            <td>${response[1].table[i].goalsC}</td>
    //                            <td>${response[1].table[i].goalsF}</td>
    //                        </tr>`;
    // }


    console.log(response);

};



var _initScript = function () {
    var services = new ProdeServicesTEST();
    this.groups = services.getGroups(1, groupsCallback);
    // services.getGroupMatchs(1, groupsCallback);

};


document.addEventListener("DOMContentLoaded", _initScript);

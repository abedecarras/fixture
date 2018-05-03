var ProdeServicesTEST = (function () {

    var p = ProdeServicesTEST.prototype;

    function ProdeServicesTEST() {}
    ;

    var sendResponse = function (response, callback) {
        setTimeout(
                function () {
                    callback(response);
                },
                250);
    };

    p.logout = function () {};

    p.login = function (user, pass, callback) {
        var response = {
            'logged': true
        };
        sendResponse(response, callback);
    };

    p.getProfile = function (callback) {
        var response = {
            'name': 'empleado 1',
            'isAdmin': false,
            'score': 22
        };
        sendResponse(response, callback);
    };

    p.getRanking = function (callback) {
        var response = [
            {
                'name': 'empleado 3',
                'score': 33
            },
            {
                'name': 'empleado 1',
                'score': 22
            },
            {
                'name': 'empleado 2',
                'score': 11
            }
        ];
        sendResponse(response, callback);
    };

    p.getGroups = function (stage, callback) {
        var response = [
            {
                'id': 1,
                'name': 'Grupo A',
                'table': [
                    {
                        'team': 'Brasil',
                        'wons': 2,
                        'draws': 1,
                        'lost': 0,
                        'goalsF': 7,
                        'goalsC': 2
                    },
                    {
                        'team': 'Méjico',
                        'wons': 2,
                        'draws': 1,
                        'lost': 0,
                        'goalsF': 4,
                        'goalsC': 1
                    },
                    {
                        'team': 'Croacia',
                        'wons': 1,
                        'draws': 0,
                        'lost': 2,
                        'goalsF': 6,
                        'goalsC': 6
                    },
                    {
                        'team': 'Camerún',
                        'wons': 0,
                        'draws': 0,
                        'lost': 3,
                        'goalsF': 1,
                        'goalsC': 9
                    }
                ]
            },
            {
                'id': 2,
                'name': 'Grupo B',
                'table': [
                    {
                        'team': 'Holanda',
                        'wons': 3,
                        'draws': 0,
                        'lost': 0,
                        'goalsF': 10,
                        'goalsC': 3
                    },
                    {
                        'team': 'Chile',
                        'wons': 2,
                        'draws': 0,
                        'lost': 1,
                        'goalsF': 5,
                        'goalsC': 3
                    },
                    {
                        'team': 'España',
                        'wons': 1,
                        'draws': 0,
                        'lost': 2,
                        'goalsF': 4,
                        'goalsC': 7
                    },
                    {
                        'team': 'Australia',
                        'wons': 0,
                        'draws': 0,
                        'lost': 3,
                        'goalsF': 3,
                        'goalsC': 9
                    }
                ]
            }
        ];
        sendResponse(response, callback);
    };

    p.getGroupMatchs = function (idGroup, callback) {
        var response = [
            {
                "id": 1,
                "localTeam": 'Brasil',
                "foreignTeam": 'Croacia',
                "localGoalsMatch": 3,
                "foreignGoalsMatch": 1,
                "localGoalsUser": 9,
                "foreignGoalsUser": 11,
                "date": '2018-06-12 15:00:00'
            },
            {
                "id": 2,
                "localTeam": 'Chile',
                "foreignTeam": 'Australia',
                "localGoalsMatch": 3,
                "foreignGoalsMatch": 1,
                "localGoalsUser": 5,
                "foreignGoalsUser": 3,
                "date": '2018-06-13 15:00:00'
            }
        ];
        sendResponse(response, callback);
    };

    p.setMatchResult = function (idMatch, goalsL, goalsF, callback) {
        var response = {
            'status': 'ok'
        };
        sendResponse(response, callback);
    };

    return ProdeServicesTEST;

}());
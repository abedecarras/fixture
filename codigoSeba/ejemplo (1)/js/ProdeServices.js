var ProdeServices = (function () {

    var
            that,
            targetURL = 'http://api.jugaelmundial2018.com/',
            p = ProdeServices.prototype;

    function ProdeServices() {
        that = this;
    }
    ;

    p._setToken = function (value) {
        localStorage['prodeToken'] = value;
    };

    p._getToken = function () {
        return localStorage['prodeToken'];
    };

    p._doServerRequest = function (target, data, callback) {
        this.viewCallback = callback;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', targetURL + target + '.php');
        xhr.withCredentials = false;
        xhr.onreadystatechange = this._callback;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send('data=' + JSON.stringify({'token': this._getToken(), 'data': data}));
    };

    p._patchEncoding = function (text) {
        text = text.replace(new RegExp("`n", 'g'), 'ñ');
        text = text.replace(new RegExp("`a", 'g'), 'á');
        text = text.replace(new RegExp("`e", 'g'), 'é');
        text = text.replace(new RegExp("`i", 'g'), 'í');
        text = text.replace(new RegExp("`o", 'g'), 'ó');
        text = text.replace(new RegExp("`u", 'g'), 'ú');
        return text;
    };

    p._callback = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var response = JSON.parse(that._patchEncoding(this.response));
                that._setToken(response.token);
                that.viewCallback(response.data);
            } else
                that.viewCallback(this.response);
        }
    };

    p.logout = function () {
        this._setToken('');
    };

    p.login = function (user, password, callback) {
        this._doServerRequest('login', {'user': user, 'password': password}, callback);
    };

    p.setPassword = function (password, callback) {
        this._doServerRequest('setPassword', {'password': password}, callback);
    };

    p.getProfile = function (callback) {
        this._doServerRequest('getProfile', {}, callback);
    };

    p.getRanking = function (callback) {
        this._doServerRequest('getRanking', {}, callback);
    };

    p.getGroups = function (stage, callback) {
        this._doServerRequest('getGroups', {'stage': stage}, callback);
    };

    p.getGroupMatchs = function (idGroup, callback) {
        this._doServerRequest('getGroupMatchs', {'idGroup': idGroup}, callback);
    };

    p.setMatchResult = function (idMatch, goalsL, goalsF, additionalGoalsL, additionalGoalsF, callback) {
        this._doServerRequest('setMatchResult', {'idMatch': idMatch, 'goalsL': goalsL, 'goalsF': goalsF, 'additionalGoalsL': additionalGoalsL, 'additionalGoalsF': additionalGoalsF}, callback);
    };

    p.setMatchDate = function(idMatch, date, callback) {
        this._doServerRequest('setMatchDate', {'idMatch': idMatch, 'newDate': date}, callback);
    };

    p.reset = function(callback) {
        this._doServerRequest('reset', {}, callback);
    };

    return ProdeServices;

}());

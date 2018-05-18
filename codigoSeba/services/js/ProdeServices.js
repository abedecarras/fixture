var ProdeServices = (function () {

    var
            that,
            targetURL = 'http://prode.jugaelmundial2018.com/services/',
            p = ProdeServices.prototype;

    function ProdeServices() {
        that = this;
        this._loadToken();
    }
    ;

    p._loadToken = function () {
        var name = 'token=';
        var cookies = document.cookie.split(';');
        this._token = '';
        for (var cookie of cookies) {
            while (cookie.charAt(0) === ' ')
                cookie = cookie.substring(1);
            if (cookie.indexOf(name) !== -1)
                this._token = cookie.substring(name.length, cookie.length);
        }
    };

    p._saveToken = function (value, duration) {
        this._token = value;
        var expireTime = new Date();
        expireTime.setTime(expireTime.getTime() + duration);
        document.cookie = 'token=' + value + ';expires=' + expireTime.toGMTString() + ';path=/';
    };

    p._doServerRequest = function (target, data, callback) {
        this.viewCallback = callback;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', targetURL + target + '.php');
        xhr.withCredentials = true;
        xhr.onreadystatechange = this._callback;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send('data=' + JSON.stringify({'token': this._token, 'data': data}));
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
                that._saveToken(response.token, 1000 * 36000);
                that.viewCallback(response.data);
            } else
                that.viewCallback(this.response);
        }
    };

    p.logout = function () {
        this._saveToken('', -1);
    };

    p.login = function (user, pass, callback) {
        this._doServerRequest('login', {'user': user, 'password': pass}, callback);
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
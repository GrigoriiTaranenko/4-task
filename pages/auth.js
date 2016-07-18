var router = require('../Router');
var template = require('../templates/auth.ejs');

var Auth = function () {
    router.user = null;
    router.role = 'anonymous';
    this.template = template();
};

Auth.prototype.render = function () {
    router.elem.html(this.template);
    router.elem.on('click', '#auto', this.auth);
};


Auth.prototype.auth = function () {
    var username = router.elem.find('#Login').val();
    var user=Auth.getUser(username);
    // TODO: обавить проверку и поиск пользователя в localStorage
    if (user) {
        router.user = username;
        router.role = user.role;

        router.goto('table', {
            user: username,
            role: user.role
        });
    }
    else {
        alert('Ты идиот!')
    }
};

Auth.prototype.close = function () {
    router.elem.off('click');
};

Auth.getUser=function(Name){
    var LocalName=localStorage.getItem(Name);
    if (LocalName) {
        LocalName = JSON.parse(LocalName);
        if (LocalName.role == 'admin' ||
            LocalName.role == 'client' ||
            LocalName.role == 'performer'
        ) return LocalName;
        else return false;
    }
};

module.exports = Auth;
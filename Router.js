var $ = require('jquery');

var lastPage = {};

var lastParams = {};

var Router = {
    pages: {},
    role: 'anonymous',
    user: null,
    elem: $('#app'),
    stack: []
};

Router.goto = function (page, params, back) {
    back = back || false;
    
    // Если у старой страницы есть метод close()
    if (lastPage && lastPage.close) {
        lastPage.close();
    }
    if (lastParams && back == false) {
        this.stack.push(lastParams);
    }
    lastParams = {
        page: page,
        params: params
    };

    $(document.body).attr('data-page', page);

    lastPage = new this.pages[page](params);
    this.elem.html('Загрузка!!!');
    lastPage.render();

    var header = require('./Header');
    header(page, this.role);
};

Router.back = function () {
    var back = this.stack.pop();
    this.goto(back.page, back.params, true);
};

module.exports = Router;
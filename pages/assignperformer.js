/**
 * Created by Sergey on 17.07.2016.
 */
var router = require('../Router');
var template = require('../templates/assignperformer.ejs');
var _=require('lodash');

var Assignperformer=function (pages){
    this.template=template;
    Assignperformer.data=pages.data;
    Assignperformer.performer=JSON.parse(localStorage.getItem('performer'));
    Assignperformer.DB=JSON.parse(localStorage.getItem('!table!'));
    this.events();
};
Assignperformer.prototype.render=function(){
    router.elem.html(this.template(Assignperformer.performer))
};

Assignperformer.prototype.events= function(){
    router.elem.on('click','.add',this.addAsignperformer)
};


Assignperformer.prototype.addAsignperformer=function(){
    var performer=router.elem.find('select').val();
    if (performer) {
        Assignperformer.DB[Assignperformer.data].performer = performer;
        localStorage.setItem('!table!', JSON.stringify(Assignperformer.DB));

    }else alert("Не назначен");
    router.goto('application',{
        data:Assignperformer.data
    })

};
Assignperformer.prototype.close=function(){
    router.elem.off();
};
module.exports=Assignperformer;
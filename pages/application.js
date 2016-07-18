/**
 * Created by Sergey on 16.07.2016.
 */
var router = require('../Router');
var template = require('../templates/application.ejs');
var _=require('lodash');

var Application = function (params) {
    this.data = params.data;
    this.status=["online","offline"];
    Application.DB = JSON.parse(localStorage.getItem('!table!'));
    if (Application.DB[this.data].client=='') Application.DB[this.data].client='Нет клиента';
    if (Application.DB[this.data].performer=='') Application.DB[this.data].performer='Не назначен';
    Application.tasklist={
        ApplicationWrite:Application.DB[this.data],
        status:this.swap(this.status,Application.DB[this.data].status),
        role:router.role
    };
    this.status=JSON.parse(localStorage.getItem('status'));
    this.template = template;
    this.events();
};
Application.prototype.events=function () {
    router.elem.on('click','#change',{data:this.data}, this.save);
    router.elem.on('click','.create',{data:this.data}, this.CreateComment);
    router.elem.on('click','#RR',{data:this.data}, this.AddPerformer)
};

Application.prototype.render=function () {
    router.elem.html(this.template(Application.tasklist))
};

Application.prototype.close=function () {
    router.elem.off('click');
};


Application.prototype.save=function (event){
    ApplicationWrite=Application.tasklist.ApplicationWrite;
    if (router.role=='performer') Application.status=router.elem.find('.status').val();
    if (router.role=='admin') {
        ApplicationWrite.estimated=router.elem.find('.estimated').val();
        ApplicationWrite.deadline=router.elem.find('.deadline').val();
        ApplicationWrite.readiness=router.elem.find('.readiness').val();
    }
    Application.DB[event.data.data]=ApplicationWrite;
    localStorage.setItem('!table!',JSON.stringify(Application.DB));
};

Application.prototype.CreateComment=function (event){
    router.goto('comment',{
        data:event.data.data
    })
};

Application.prototype.AddPerformer=function(event){
    router.goto('assignperformer',{
        data:event.data.data
    })
};





Application.prototype.swap=function(array,elem){
    var i=0;
    while (array[i]!=elem) i++;
    array.splice(i,1);
    array.splice(0,0,elem);
    return array;
};


module.exports=Application;

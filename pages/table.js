var router = require('../Router');
var template = require('../templates/table.ejs');
var _=require('lodash');

var Table = function (params) {
    this.user = params.user;
    this.role = params.role;
    Table.DB=JSON.parse(localStorage.getItem('!table!'));
    var userA=JSON.parse(localStorage.getItem(params.user));
    this.status=JSON.parse(localStorage.getItem('status'));
    this.allClient=JSON.parse(localStorage.getItem('client'));
    this.template = template;
    if (this.role!='admin') Table.DB=this.filterUser(Table.DB,userA.array);

    this.taskList = {
        TableWrite:Table.DB,
        role:this.role,
        client:this.allClient,
        status:this.status
    };
    this.events();
};


Table.getData = function (data) {
//    var data = this.taskList;
    var status=Table.status();
    var client=Table.client();
    var search=Table.search();
    var sort=Table.th;
    if (status!="не фильтровать") {
        data.TableWrite=_.filter(data.TableWrite, {"status":status})
    }
    if (client!="не фильтровать" && client) {
        data.TableWrite=_.filter(data.TableWrite, {"client":client});
    }
    if (search!="") {
        data.TableWrite=_.filter(data.TableWrite, function (o) {return o.description.indexOf(search)>-1});
    }
    if (sort.length>0) {
        data.TableWrite=_.sortBy(data.TableWrite,function (o) {
            return o[sort];
        });
    }
    if (data.role!="client")Table.swap(data.client,client);
    Table.swap(data.status,status);
    return data;
};

Table.application=function(event){
    router.goto('application',{
        data:event.currentTarget.dataset.id
    })
};

Table.prototype.events = function () {
    // router.elem.on('click')
    router.elem.on('click','th',{taskList:this.taskList, template:this.template}, Table.sort);
    router.elem.on('click','tbody tr', Table.application);
    router.elem.on('click','.button',{
        template:this.template,
        role:this.role,
        allClient:this.allClient,
        status:this.status
    }, Table.renderClick);
    router.elem.on('click','#addtr',this.addtr)
};

Table.renderClick=function(events){
    var taskList={
        TableWrite:Table.DB,
        role:events.data.role,
        client:events.data.allClient,
        status:events.data.status
    };
    router.elem.html(events.data.template(Table.getData(taskList)))
};

Table.prototype.render = function () {
    router.elem.html(this.template(this.taskList));
};

Table.prototype.close = function () {
     router.elem.off('click')
};
Table.prototype.addtr=function(){
    router.goto('editor')
};












Table.prototype.filterUser=function (DB,array) {
    array = _.map(array, function(a) {return {data: a}});
    DB = _.intersectionBy(DB, array, 'data');
    return DB;
};
Table.status = function(){
    return router.elem.find('.status').val();
};
Table.client = function(){
    return router.elem.find('.client').val();
};
Table.sort = function(e){
    Table.th= e.currentTarget.dataset.sort;
};
Table.search = function(){
    return router.elem.find('.text').val();
};
Table.swap =function (array, elem) {
    var i=0;
    while (array[i].name!=elem) i++;
    array.splice(i,1);
    array.splice(0,0,{name:elem});
    return array;
};

Table.th="";

module.exports = Table;

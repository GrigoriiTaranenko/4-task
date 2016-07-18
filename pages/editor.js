/**
 * Created by Sergey on 16.07.2016.
 */
var router=require("../Router");
var template=require("../templates/editor.ejs");
var Editor=function () {
    this.template=template;
    this.DB=JSON.parse(localStorage.getItem("!table!"));
    this.elem={
        "Name":"",
        "description":"",
        "client":"",
        "Comment":[],
        "performer":"",
        "status":"",
        "readiness":0,
        "data":"",
        "estimated":"",
        "deadline":""
    }
};
Editor.prototype.render=function(){
    router.elem.html(template);
    router.elem.on('click', '.add',{elem:this.elem, DB:this.DB}, this.editor)
};

Editor.ValueIsLocal = function(collection){
    if (collection.Name==""
        || collection.description==""
        || collection.estimated==""
        || collection.deadline=="") return false;
    else return true;
};

Editor.prototype.editor =function (event) {
    event.data.elem.Name=router.elem.find('.Name').val();
    event.data.elem.description=router.elem.find(".ticket").val();
    event.data.elem.status=router.elem.find(".status").val();
    event.data.elem.estimated=router.elem.find(".estimated").val();
    event.data.elem.deadline=router.elem.find(".deadline").val();
    event.data.elem.data=event.data.DB.length;
    if (router.role!="admin") event.data.elem.client=router.user;
    if (event.data.elem.Name!="" && (Editor.ValueIsLocal(event.data.elem))){
        Editor.AssignValue(event.data.elem,event.data.DB);
        router.goto('table', {
            user: router.user,
            role: router.role
        })    }
    else alert('Вам явно что-то не хватает');
};



Editor.AssignValue=function(collection,DB){
    if (router.role=='client') {
        user = JSON.parse(localStorage.getItem(router.user));
        user.array.push(DB.length);
        localStorage.setItem(router.user, JSON.stringify(user))
    }
    DB.push(collection);
    localStorage.setItem('!table!',JSON.stringify(DB))
};

Editor.prototype.close=function(){
    router.elem.off('click');
};

module.exports=Editor;
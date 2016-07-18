/**
 * Created by Sergey on 15.07.2016.
 */
var router=require('../Router');
var template=require('../templates/client.ejs');

var Client=function (){
    router.user=null;
    router.role='anonymous';
    this.template=template;
};

Client.prototype.render=function(){
    router.elem.html(template);
    router.elem.on('click', '#Registration',this.client)
};

Client.ValueIsLocal = function(Name){
    return localStorage.getItem(Name);
};

Client.prototype.client =function () {
    var UserName=router.elem.find('.moi:first').val();
    if (UserName && !(Client.ValueIsLocal(UserName))){
        Client.AssignValue(UserName);
        router.goto('auth');
    }
    else alert('Уже есть такой пользователь');
};



Client.AssignValue=function(name){
    var write={
        "role":"client",
        "array":[]
    };
    var writePerformer=JSON.parse(localStorage.getItem("client"));
    writePerformer.push({"name":name});
    localStorage.setItem("client", JSON.stringify(writePerformer));
    localStorage.setItem(name, JSON.stringify(write));
};

Client.prototype.close=function(){
    router.elem.off('click');
};
module.exports=Client;
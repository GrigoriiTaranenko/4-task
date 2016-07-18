/**
 * Created by Sergey on 16.07.2016.
 */
var router=require('../Router');
var template=require('../templates/performer.ejs');

var Performer=function () {
    this.template=template;
};
Performer.prototype.render=function(){
    router.elem.html(template);
    router.elem.on('click', '#RegistrationName',this.performer)
};

Performer.ValueIsLocal = function(Name){
    return localStorage.getItem(Name);
};

Performer.prototype.performer =function () {
    var UserName=router.elem.find('.moi:first').val();
    if (UserName && !(Performer.ValueIsLocal(UserName))) {
        Performer.AssignValue(UserName);
        router.goto('table', {
            user: router.user,
            role: router.role
        })
    }
    else alert('Уже есть такой пользователь');
};



Performer.AssignValue=function(name){
    var write={
        "role":"performer",
        "array":[]
    };
    var writePerformer=JSON.parse(localStorage.getItem("performer"));
    writePerformer.push({"name":name});
    localStorage.setItem("performer", JSON.stringify(writePerformer));
    localStorage.setItem(name, JSON.stringify(write));

};

Performer.prototype.close=function(){
    router.elem.off('click');
};
module.exports=Performer;
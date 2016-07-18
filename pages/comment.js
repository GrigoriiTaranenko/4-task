/**
 * Created by Sergey on 17.07.2016.
 */
var router=require("../Router");
var template=require("../templates/comment.ejs");
var Comment = function(params) {
    this.template=template;
    Comment.data = params.data;
    Comment.DB = JSON.parse(localStorage.getItem('!table!'));
    this.events();
};
Comment.prototype.render=function(){
    router.elem.html(template)
};
Comment.prototype.events=function () {
    router.elem.on('click','.AddComment',this.AddComment)
};

Comment.prototype.AddComment=function () {
    var comment=router.elem.find('textarea').val();
    Comment.DB[Comment.data].Comment.push(router.user+": "+comment);
    localStorage.setItem('!table!',JSON.stringify(Comment.DB));
    router.goto('application',{
        data:Comment.data
    })
};
Comment.prototype.close=function(){
    router.elem.off('click')  
};
module.exports=Comment;
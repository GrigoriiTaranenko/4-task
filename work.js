/**
 *
 * @type {{spisok: {}, getSpisok: router.getSpisok}}
 */
/**
 *
 * @param application
 * @param numer
 * @constructor
 */
function Work(application, numer){
    this.ApplicationClassnName=application.className;
    //var self = this;
    var creation=true;
    var self=document.body.insertBefore(application.cloneNode(true),document.body.children[numer]);
    this.getSelf=function(){
        return self;
    };
    this.getCreation=function(){
        return creation;
    };
    this.delete=function(){
        if (creation) {
            creation=false;
            document.body.removeChild(self);
        }
        else return(alert('объекта нет'))
    };

    this.append=function(numer){
        if (creation) alert('объект уже был создан');
        else {
            creation=true;
            self=document.body.insertBefore(self.cloneNode(true), document.body.children[numer]);
        }
    };

    function autorization() {
        var login = document.getElementById('Login').value;
        var control = JSON.parse(localStorage.getItem(login));
        if (control != null) {
            Table.memory.setCount();
            Table.memory.setName(login);
            switch (control.status) {
                case 'admin':
                    body.delete();
                    body=Table.admin(Table.memory.count);
                    break;
                case 'client':
                    body.delete();
                    body=Table.client(Table.memory.setArray(control.array));
                    break;
                case 'performer':
                    body.delete();
                    body=Table.performer(Table.memory.setArray(control.array));
                    break;
                default:
                    return alert('Нет такого');
            }
            body.init();
        } else alert('Нет такого');
    }
    this.CreateHandler=function(){
        auto.addEventListener('click', autorization);
    };
}
/**
 *
 * @param user
 */
Work.accessible=function(user){
    for(var key in Work.access){
        Work.access[key] = key == user;
    }
    return Work.access;
};
Work.accessResult=function(){
    for(var key in Work.access){
        if (Work.access[key]==true) return key;
    }  
};
Work.access={
    admin:false, 
    performer:false, 
    client:false
};

Work.router={
    spisok: {},
    decomposed:function(String){
        list=String.split(' ');
        return list[0];
    },
    getSpisok: function(){
        for (var i=0;i<9;i++) {
            var child = document.body.children[i];
            this.spisok[this.decomposed(child.className)] = child;
        }
    }
};
module.exports=Work;
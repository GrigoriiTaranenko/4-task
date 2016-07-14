Work=require("./work");
Addticket=require("./addticket");
Table.prototype=Object.create(Work.prototype);
Table.prototype.constructor = Table;
/**
 * Класс для вызова Таблицы
 * @param application - Параметр для передачи блока таблицы
 * @param numer - Параметр для расположние данного блока
 * @constructor - Наследуется от Work + дополняет
 * @TableDelete - Удаления всех ненужных элементов в таблицы
 */
function Table(application,numer){
    Work.apply(this,arguments);
    self=this.getSelf();
    var table=self.getElementsByClassName('table')[0];
    var DB = JSON.parse(localStorage.getItem('!table!'));
    var append=self.getElementsByClassName('addtr')[0];

    this.getAppendHiden=function(){
        append.classList.add('hidden')
    };
    this.getAppendDeleteHiden=function(){
        append.classList.remove('hidden');
    };
    this.getTable=function () {
        return self.querySelector('table');
    };
/*    this.TableDelete=function(){
        for (var i=1; i<table.length; i++) table.rows[1].remove();
    };*/


    append.classList.add('hidden');


    this.Tableadd=function(SpisokNumber){
        for (var i=0; i<SpisokNumber.length; i++){
            var row = table.insertRow();
            row.setAttribute('data-id', i);
            var TableN = row.insertCell();
            var TableA = row.insertCell();
            TableN.innerHTML=DB.Name[SpisokNumber[i]];
            TableA.innerHTML=DB.application[SpisokNumber[i]];
        }
    };
    this.TableHidden=function () {
        self.classList.add('hidden');    
    };
    this.TableHiddenEnd=function () {
        self.classList.remove('hidden');
    };
    this.init=function(){
        var tableevents=body.getTable();
        tableevents.onclick=function(event){
            var target=event.target;
            if (target.tagName=='TD') {
                target=target.parentNode.getAttribute('data-id');
                Table.memory.setNumer(target);
                head.PushElementBack();
                body=new Addticket(Work.router.spisok.application,1);
                if (Work.accessResult()=='admin') body.OutputStringAdmin(target);
                else body.OutputStringUser(target);
            }
        };
    };
    function Addtr(){
        head.Registration();
        head.PushElementBack();
        body=new Addticket(Work.router.spisok.editor,1);
    }
    this.CreateHandler=function(){
        addtr.addEventListener('click',Addtr);
    };
    this.CreateHandler();
}


Table.client=function(SpisokNumber){
    Work.accessible('client');
    head.qualifier(Work.access);
    var table=new Table(Work.router.spisok.TableApplications, 1);
    table.Tableadd(SpisokNumber);
    table.getAppendDeleteHiden();
    return table;
};

Table.admin=function(count){
    Work.accessible('admin');
    head.qualifier(Work.access);
    var table=new Table(Work.router.spisok.TableApplications, 1);
    var SpisokNumber=[];
    for (var i=0; i<count; i++) SpisokNumber.push(i);
    table.Tableadd(SpisokNumber);
    table.getAppendDeleteHiden();
    return table;
};

Table.performer=function(SpisokNumber){
    Work.accessible('performer');
    head.qualifier(Work.access);
    var table=new Table(Work.router.spisok.TableApplications, 1);
    table.Tableadd(SpisokNumber);
    return table;
};

Table.run=function(){
     switch(Work.accessResult()){
         case 'admin':
             body.delete();
             body=Table.admin(Table.memory.count);
             break;
         case 'client':
             body.delete();
             body=Table.client(Table.memory.array);
             break;
         default:
             body.delete();
             body=Table.performer(Table.memory.array);
     }
    body.init();
    return body;
};

Table.memory={
    count:0,
    array:[],
    Name:'',
    Numer:0,
    Performer:[],
    setCount:function(){
        DB=JSON.parse(localStorage.getItem('!table!'));
        this.count=DB.count;
    },
    setArray:function(Array){
        this.array=Array;
        return Array;
    },
    pushArray:function(Number){
        this.array.push(Number);
    },
    setName:function(Name){
        this.Name=Name;
    },
    setNumer:function(Numer){
        this.Numer=Numer;
    },
    setPerformer:function(Performer){
        this.Performr=Performer;
    }
};
module.exports=Table;

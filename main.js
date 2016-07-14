var Work=require("./work");
var Head=require("./head");
var Event=require("./Event");
var Registration=require("./registration");
var Addticket=require("./addticket");
require('./style.css');


function delet(first, last) {
    for (i = first; i <= last; i++) {
        //application[i] = document.body.children[first + 1];
        document.body.removeChild(document.body.children[0]);
        //        application.style.display='none'
    }
}

Work.router.getSpisok();
delet(1, 9);
head = new Head(Work.router.spisok.windows, 0);
body = new Work(Work.router.spisok.authorization, 1);
body.CreateHandler();

if (localStorage.getItem('admin') == null) localStorage.setItem('admin', JSON.stringify({
    "status": "admin"
}));
if (localStorage.getItem('!table!') == null) localStorage.setItem('!table!', JSON.stringify({
    "Name": [],
    "application": [],
    "Comment": [[]],
    "count": 0
}));
if (localStorage.getItem('!Performer!') == null) localStorage.setItem('!Performer!', JSON.stringify({
    "Name": []
}));

/**
 * Created by Sergey on 09.07.2016.
 */
Work=require('./work');
Registration.prototype=Object.create(Work.prototype);
Registration.prototype.constructor=Registration;

function Registration(application, numer){
    Work.apply(this,arguments);
    self=this.getSelf();
    var regisration={"status":"","array":[]};
    this.getName=function () {
        return self.getElementsByClassName('moi')[0].value;
    };
    this.addUser=function(name, status){
        var TestName=localStorage.getItem(name);
        if (TestName!=null) return alert('нихуя');
        regisration.status=status;
        localStorage.setItem(name, JSON.stringify(regisration));
        alert('Успешно добавленно');
        if (status=='performer'){
            var Performer=JSON.parse(localStorage.getItem('!Performer!'));
            Performer.Name.push(name);
            localStorage.setItem('!Performer!',JSON.stringify(Performer));
        }
    };
    function SignUpClient(){
        Name=body.getName();
        body.addUser(Name,'client');
        head.home();
        body=new Work(Work.router.spisok.authorization, 1);
    }

    function SignUpPerformer() {
        Name=body.getName();
        body.addUser(Name,'performer');
        body=head.PopElementBack();
    }
    this.CreateHandler=function(){
        Input=self.querySelectorAll('Input')[1];
        switch (self.className){
            case "Client moiblock":
                Input.addEventListener('click', SignUpClient);
                break;
            case "performer moiblock":
                Input.addEventListener('click', SignUpPerformer);
                break;
            default:
                alert('hello');
        }
    };
    this.CreateHandler();
}
module.exports=Registration;

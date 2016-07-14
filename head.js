
Work=require("./work");
Registration=require("./registration");
Table=require("./table");

Head.prototype=Object.create(Work.prototype);
Head.prototype.constructor=Head;
/**
 *
 * @param application
 * @param numer
 * @constructor
 * @this.qualifier РѕРїСЂРµРґРµР»СЏРµС‚ РєР°РєРёРµ РєРЅРѕРїРєРё РЅСѓР¶РЅРѕ РІРєР»СЋС‡РёС‚СЊ РїСЂРё СЂРµРіРёСЃС‚СЂР°С†РёРё
 * @this.Home() - РґРµР»Р°РµС‚ РјРµРЅСЋ РєР°Рє РЅР° РїРµСЂРІРѕРЅР°С‡Р°Р»СЊРЅРѕР№ СЃС‚СЂР°РЅРёС†С‹
 */

function Head(application, numer){
    Work.apply(this,arguments);
    var PreviousBlock = [];
    this.qualifier = function(ObjectAccess){
        var Access='';
        for (var key in ObjectAccess)
            if (ObjectAccess[key]){
                Access=key;
                break;
            }
        switch (Access){
            case 'admin':
                RP.classList.remove('hidden');
                RC.classList.add('hidden');
                Exit.classList.remove('hidden');
                break;
            case 'client':
                RP.classList.add('hidden');
                RC.classList.add('hidden');
                Exit.classList.remove('hidden');
                break;
            case 'performer':
                RP.classList.add('hidden');
                RC.classList.add('hidden');
                Exit.classList.remove('hidden');
                break;
            default:
                RP.classList.add('hidden');
                RC.classList.remove('hidden');
                Exit.classList.add('hidden');
        }
    };
    this.addBack = function(){
        Back.classList.remove('hidden');
    };
    this.deleteBack=function(){
        Back.classList.add('hidden');
    };
    this.home = function(){
        body.delete();
        PreviousBlock=[];
        this.qualifier(Work.accessible());
        this.deleteBack();
    };
    this.Registration=function(){
        RP.classList.add('hidden');
        RC.classList.add('hidden');
        Exit.classList.remove('hidden');
    };
    this.PushElementBack=function(){
        this.addBack();
        PreviousBlock.push(body.ApplicationClassnName);
        body.delete();
    };
    this.PopElementBack=function(){
        var Name=PreviousBlock.pop();
        PreviousBlock=[];
        if (PreviousBlock=[]) this.deleteBack();
        switch(Name){
            case 'TableApplications':
                body=Table.run();
                break;
            default:
                body=Table.run();
        }
        return body;
    };
    function RegistrationPerfomen(){
        head.Registration();
        head.PushElementBack();
        body=new Registration(Work.router.spisok.performer,1);
    }
    function RegistrationClient(){
        console.log('test');
        head.Registration();
        body.delete();
        body=new Registration(Work.router.spisok.Client,1);
    }
    function exite() {
        head.home();
        body=new Work(Work.router.spisok.authorization, 1);
        body.CreateHandler();
    }
    function back(){
        body=head.PopElementBack();
    }
    this.CreateHandler=function(){
        RP.addEventListener('click',RegistrationPerfomen);
        RC.addEventListener('click',RegistrationClient);
        Exit.addEventListener('click',exite);
        Back.addEventListener('click',back);
    };
    this.CreateHandler();
}

module.exports=Head;
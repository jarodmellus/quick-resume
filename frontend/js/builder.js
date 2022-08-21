import {Resume,Education,Experience, Style} from './resume_data.js';
import * as Components from './resume_components.js';

let workingResume = null;
let changed = {
    name:true,
        firstName:true,
        middleName:true,
        lastName:true,
        suffix:true,

    contact:true,
        phoneNumber:true,
        email:true,
        website:true,
        address:true,
            street:true,
            state:true,
            city:true,
            zipcode:true,

    objectiveContent:true,
    experienceContent:true,
    educationsContent:true,
    skillsContent:true,
    awardsContent:true
}
let paths = {
    name:"content.name",
        firstName:"content.name.firstName",
        middleName:"content.name.middleName",
        lastName:"content.name.lastName",
        suffix:"content.name.suffix",

    contact:"content.contact",
        phoneNumber:"content.contact.phoneNumber",
        email:"content.contact.email",
        website:"content.contact.website",
        address:"content.contact.address",
            street:"content.contact.street",
            state:"content.contact.state",
            city:"content.contact.city",
            zipcode:"content.contact.zipcode",

    objectiveContent:"content.objectiveContent",
    experienceContent:"content.experienceContent",
    educationContent:"content.educationContent",
    skillsContent:"content.skillsContent",
    awardsContent:"content.awardsContent"
}
let header_names = {
    "skills":"Skills",
    "awards":"Awards & Accomplishments",
    "hobbies":"Hobbies",
}

const UpdateResume = () => {
    DrawResume();
}


//change the DOM to reflect the working resume object
const DrawResume = () => {
    
    //1) filter out sections that do not need to be redrawn
    //2) map the the path to each object to a list
    var changedKeys = Object.keys(changed).filter((key)=>{
        if (changed[key]) return key
    })

/*

    var paths=RecursiveKeys([], changedKeys, workingResume.content, "");
    */

    Object.entries(paths).forEach(([key,value]) => {
        var path=value;
        if(path===null || path===undefined) return;
        var s = path.split(".");
        var key=s[s.length-1];
        if(key===null || path===undefined) return;
        var elem = document.getElementById("preview_" + key); 
        if(elem===null || path===undefined) {
            document.getElementById("preview").appendChild(document.createElement("div"))
            .setAttribute("id","preview_"+key);

            elem = document.getElementById("preview_" + key);
        }
        elem = document.getElementById("preview_" + key);
        console.log("value",typeof getNestedPropertyValue(workingResume,path))
        elem.textContent = getNestedPropertyValue(workingResume,path);
        console.log(elem.innerHTML);
    })  
}

window.onload = () => {
    workingResume = localStorage.getItem("workingResume");
    if(workingResume == null) {
        console.log("No resume in localStorage to be used as working resume...");
        workingResume=Resume();
    }

    UpdateResume();
    console.log("Page Loaded.");
}

document.getElementById('editor-form').addEventListener('input', (event) => {
    //var fields = findKey(workingResume.content,event.target.getAttribute('id'),"");
    workingResume=setNestedPropertyValue(workingResume,paths[workingResume.content,event.target.getAttribute('id')],event.target.value);
    //changed.setNestedPropertyValue

    UpdateResume();
    
});

function setNestedPropertyValue(obj, fields, val)
{
    if(fields.length==0) {

    }

   
    fields = fields.split('.');

    var cur = obj,
    last = fields.pop();

    fields.forEach(function(field) {
        cur = cur[field];
    });


    if(cur[last]===null) {
        throw ("Search could not find object with key: " + last);
    }
    
    if(Array.isArray(cur[last])) {
        console.log("cur[last]",cur[last]);
        cur[last].push(val);
    }
    else {
        cur[last] = val;
    }

    return obj;
}

function getNestedPropertyValue(obj, fields)
{
    fields = fields.split('.');

    var cur = obj,
    last = fields.pop();

    fields.forEach(function(field) {
        cur = cur[field];
    });

    if(cur[last]===null) {
        throw ("Search could not find object with key: " + last);
    }
    return cur[last];
}

function findKey(tree, seeking, keySoFar) {
    var keys = Object.keys(tree);
    for(var i = 0; i<keys.length; i++) {
        var key = keys[i];
        var obj = tree[key];
        if(key==seeking) return keySoFar + "." + key;
        
        if(obj===null || obj===undefined) continue;
        
        var retkey = findKey(obj,seeking,keySoFar + "." + key); 
        if(retkey!=null) return retkey;
        
    } 
    //return null;
}

//returns a flattened array of all keys in object tree structure
const RecursiveKeys = (paths, keys, obj, keySoFar) => {
    for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if(key==0) throw "key is bad"
        var cur = obj[key];
        if(cur===null || cur === undefined) continue;
    
        //var newPath = findKey( cur, RecursiveKeys(paths, Object.keys(cur), cur, keySoFar+"."+key)
        paths.push( findKey( cur, RecursiveKeys(paths, Object.keys(cur), cur, keySoFar+"."+key)),  keySoFar + "." + key);    
    }

    if(paths!==null && paths!==undefined) return paths;
}

function ResumeToJson(resume) {
    return JSON.stringify(resume);
}

function JsonToResume(json) {
    return JSON.parse(json);
}

function SaveResume() {

}

function AutoSave() {

}

onchange = (event) => { }

$("#btn-save").click( function() {
    var text = $("#textarea").val();
    var filename = $("#input-fileName").val()
    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename+".txt");
  });
/*
function blob_test() {
    var text = test//$("#textarea").val();
    var filename = $("#input-fileName").val()
    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename+".txt");
  }
*/


/*
  var data = new FormData();
  data.append("upfile", new Blob(["CONTENT"], {type: "text/plain"}));
  fetch("SERVER.SCRIPT", { method: "POST", body: data });
  */
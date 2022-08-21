import {Resume,Education,Experience, Style} from './resume_data.js';
import * as Components from './resume_components.js';

let workingResume = null;
let changed = {
    name:true,
    contact:true,
    objective:true,
    experiences:true,
    educations:true,
    skills:true,
    awards:true,
    hobbies:true,
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
    var preview = document.getElementById("preview");
    workingResume;

    //1) filter out sections that do not need to be redrawn
    //2) map the the path to each object to a list
    var changedKeys = Object.keys(workingResume.content).filter((key)=>{if (changed[key]) return key})

    var paths=RecursiveKeys([], changedKeys, workingResume.content, "");
  

    paths.forEach((path) => {
        console.log("path",path);
        console.lo
        if(path===null || path===undefined) return;
        var s = path.split(".");
        var key=s[s.length-1];
        console.log(key);
        if(key===null || path===undefined) return;
        var elem = document.getElementById("preview_" + key); 
        if(elem===null || path===undefined) {
            document.getElementById("preview").appendChild(document.createElement("div")).setAttribute("id","preview_"+key);
            elem = document.getElementById("preview_" + key);
        }
        elem = document.getElementById("preview_" + key);
        console.log("Elem",elem);
        elem.innerHTML = getNestedPropertyValue(workingResume,"content" + path);
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
    var id = event.target.getAttribute('id');
    var fields = findKey(workingResume.content,event.target.getAttribute('id'),"");
    workingResume=setNestedPropertyValue(workingResume,"content" + fields,event.target.value);
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
        cur[last].append(val);
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
        
        if(obj===null) continue;
        
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
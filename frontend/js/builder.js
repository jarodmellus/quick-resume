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
    var res = workingResume;

    //1) filter out sections that do not need to be redrawn
    //2) map the the path to each object to a list
    var changedKeys = Object.keys(res.content).filter((key)=>{if (changed[key]) return key})
    console.log("changedKeys",changedKeys);

    var paths=RecursiveKeys([], changedKeys, res, "");
    console.log("paths",paths);

    paths.forEach((path) => {
        var key = path.split(".")[path.length-1];
        document.getElementById(key).innerHTML = getNestedPropertyValue(res,"content" + path);
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
    console.log("test",workingResume["content.name"]);
    var id = event.target.getAttribute('id');
    var fields = findKey(workingResume.content,event.target.getAttribute('id'),"");
    workingResume=setNestedPropertyValue(workingResume,"content" + fields,event.target.value);
    //changed.setNestedPropertyValue
    console.log("workingResume",workingResume);

    UpdateResume();
    
});

function setNestedPropertyValue(obj, fields, val)
{
    console.log("final fields",fields);
    fields = fields.split('.');

    var cur = obj,
    last = fields.pop();

    fields.forEach(function(field) {
        cur = cur[field];
    });

    console.log("last",last);

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
    console.log("final fields",fields);
    fields = fields.split('.');

    var cur = obj,
    last = fields.pop();

    fields.forEach(function(field) {
        cur = cur[field];
    });

    console.log("last",last);

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
    return null;
}

//returns a flattened array of all keys in object tree structure
const RecursiveKeys = (paths, keys, obj, keySoFar) => {
    for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if(key==0) throw "key is bad"
        console.log(key);
        var cur = obj[key];
        if(cur===null || cur === undefined) continue;
    
        paths.push( findKey( cur, RecursiveKeys(paths, Object.keys(cur), cur, keySoFar+"."+key)),  keySoFar + "." + key);
    }
    return paths;
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
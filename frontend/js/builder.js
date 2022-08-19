import {Resume,Education,Experience, Style} from './resume_data.js';
import * as Components from './resume_components.js';

let workingResume = null;
let changed = {
    "name":true,
    "contact":true,
    "objective":true,
    "experiences":true,
    "educations":true,
    "skills":true,
    "awards":true,
    "hobbies":true,
}
let header_names = {
    "skills":"Skills",
    "awards":"Awards & Accomplishments",
    "hobbies":"Hobbies",
}

const UpdateResume = () => {
    DrawResume();
}

const DrawResume = () => {
    var preview = document.getElementById("preview");
    var res = workingResume.content;
    //filter out sections that do not need to be redrawn
    //console.log("res:",res);
    Object.keys(res).filter((value, key)=>{return changed[key]}).forEach((value, key) => {
        if(!changed[key]) {
            return;
        }
        k=key;
        switch(key) {
            case "name":
                var name = preview.getElementById("name_section");
                res.name.forEach((value, key) => {

                })
                break;
            case "contact":
                var contact = preview.getElementById("contact_section");
                res.contact.forEach((value, key) => {          
                    if(key=="address") {
                        var address = preview.getElementById
                        res.contact.forEach((value, key) => {
                            if(!contact.getElementById("key")) {
                                contact.append("<p>"+"</p>");
                            }
                        })
                    }
                })
                break;
            case "objective":
                var objective = preview.getElementById("objective");
                break;
            case "experiences":
                var experience = preview.getElementById("experiences");
                res.experiences.forEach((element) => {          
                    res.experiences.append(Component.ExperienceComponent(element));
                });
                break;
            case "educations":
                var experience = preview.getElementById("educations");
                res.experiences.forEach((element) => {          
                    res.experiences.append(Component.EducationComponent(element));
                });
                break;
            case "skills":   
            case "awards":
            case "hobbies":
                res.experience.append("<h2>"+header_names[k]+"<h2><lu class='"+k+"'-list>");
                res.find(k).forEach((element) => {          
                    res.experiences.append("<li>"+element+"</li>");     
                });
                res.experience.append("</lu>");
                break;
        }
        changed[key]=false;
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
    //console.log("hehe ",searchById(workingResume.content, event.target.getAttribute('id')));
    var id = event.target.getAttribute('id');
    //searchById(workingResume.content,id,v) 
    //workingResume.filter((key,value) => {
    //    if(key==id) return value;
    //}) = "halleluiaia"
    var fields = findKey(workingResume.content,event.target.getAttribute('id'),"");
    console.log("fields",fields);
    workingResume=setNestedPropertyValue(workingResume,"content" + fields,event.target.value);
    console.log("hello??",event.target.value)


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
        console.log("helo????? jello>");
        cur[last].append(val);
    }
    else {
        console.log("no jelloo.....");
        cur[last] = val;
    }

    return obj;
}

function findKey(tree, seeking, keySoFar) {
    console.log(tree);
    var keys = Object.keys(tree);
    for(var i = 0; i<keys.length; i++) {
        var key = keys[i];
        var obj = tree[key];
        console.log("key seeking",key,seeking);
        if(key==seeking) {
            console.log("HIIIII!!!!");
            return keySoFar + "." + key;
        } 
        
        if(obj===null) continue;
        
        var retkey = findKey(obj,seeking,keySoFar + "." + key); 
        if(retkey!=null) {
            return retkey;
        } 
    } 
    return null;
}

/*


function searchById(tree, id, ret) {
    var keys = Object.keys(tree);
    for(var i = 0; i<keys.length; i++) {
        var key = keys[i];
        var obj = tree[key];
        console.log(key);
        if(key==id) {
            ret=obj;
            return obj;
        } 
        
        if(obj===null) continue;
        
        var child = searchById(obj,id); 
        if(child!==null && child!==undefined) {
            return child;
        } 
    }
}
*/

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

onchange = (event) => { };
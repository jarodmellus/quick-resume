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
    res.filter((value, key)=>{return changed[key]}).forEach((value, key) => {
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
    console.log("hello?");
    workingResume = localStorage.getItem("workingResume")
    if(workingResume == null) {
        console.log("No resume in localStorage to be used as working resume...");
        workingResume=Resume();
        return;
    }
    UpdateResume();
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

document.getElementById('editor-form').addEventListener('input', (event) => {
    console.log(event);
    console.log(workingResume);
    searchById(workingResume,event.target.getAttribute('id')) = event.target.value;
    UpdateResume();
    console.log("hey?");
});

//https://stackoverflow.com/questions/52066403/recursive-tree-search-in-a-nested-object-structure-in-javascript
const searchById = (tree, id) => {
    if (id===(Object.keys(tree)[0])) {
        return tree.label;
    }
    
    var children = Object.values(tree);
    for(var child in children) {
        if(!(typeof child === 'object' && yourVariable !== null)) continue;

        const found = searchById(child, id);
      
        if (found) {
        return Object.values(found)[0];
        }
    }
};

onchange = (event) => { };
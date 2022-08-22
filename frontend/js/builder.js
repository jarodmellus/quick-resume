import {Resume,Education,Experience, Style} from './resume_data.js';
import * as Components from './resume_components.js';

let workingResume = null;
let changed = {
    name:false,
        firstName:false,
        middleName:false,
        lastName:false,
        suffix:true,

    contact:false,
        phoneNumber:false,
        email:false,
        website:false,
        address:false,
            street:false,
            state:false,
            city:false,
            zipcode:false,

    objectiveContent:false,
    experienceContent:false,
        job_title:false,
        company:false,
        state:false,
        start_month:false,
        end_month:false,
        start_year:false,
        end_year:false,
        city:false,
        state:false,
        responsiblities:false,
    educationsContent:false,
        school_name:false,
        school_state:false,
        school_start_month:false,
        school_end_month:false,
        school_start_year:false,
        school_end_year:false,
        school_city:false,
        school_state:false,
        gpa:false,
        degrees:false,
    skillsContent:false,
    awardsContent:false
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
        school_name:"content.educationContent.school_name",
        school_state:"content.educationContent.school_state",
        school_start_month:"content.educationContent.school_start_month",
        school_end_month:"content.educationContent.school_end_month",
        school_start_year:"content.educationContent.school_start_year",
        school_end_year:"content.educationContent.school_end_year",
        school_city:"content.educationContent.school_city",
        school_state:"content.educationContent.school_state",
        gpa:"content.educationContent.gpa",
        degrees:"content.educationContent.degrees",
    skillsContent:"content.skillsContent",
    awardsContent:"content.awardsContent"
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

    Object.entries(paths).forEach(([key,value]) => {
        var path=value;
        if(path===null || path===undefined) return;
        var s = path.split(".");
        var key=s[s.length-1];
        if(key===null || path===undefined) return;

        
        switch(key) {
            case "name":
            case "contact":
            case "address":
                return;
            //case "lastName":    
            //    break;
        }
        


        document.getElementById("preview_" + key).innerHTML = getNestedPropertyValue(workingResume,path);
        //console.log("value",typeof getNestedPropertyValue(workingResume,path))
        //elem.textContent = getNestedPropertyValue(workingResume,path);
        //console.log(elem.innerHTML);
        changed[key]=false;
        
    })  
}

window.onload = () => {
    workingResume = localStorage.getItem("workingResume");
    if(workingResume == null) {
        console.log("No resume in localStorage to be used as working resume...");
        workingResume=Resume();
    }

   // UpdateResume();
    console.log("Page Loaded.");
}

document.getElementById('editor-form').addEventListener('input', (event) => {
    var id = event.target.getAttribute('id');
    //var fields = findKey(workingResume.content,event.target.getAttribute('id'),"");
    workingResume=setNestedPropertyValue(workingResume,paths[workingResume.content,event.target.getAttribute('id')],event.target.value);
    //changed.setNestedPropertyValue
    changed[id]=true;

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



const addEducation =()=>{
    //add new blank education
    workingResume=setNestedPropertyValue(workingResume,paths["educationContent"],Education());
    var id=getUniqueId("education");

    var prevString = Components.EducationPreview(getNestedPropertyValue(workingResume,"content.educationContent"), id);
    var formString =         `
    <div id="education`+ id + `">
        <textarea class="form-control" aria-label="" placeholder="Write here..." ></textarea> 

        <button onclick="removeEducation(`+id+`)" type="button"  >Remove education</button>
    </div>`

    //document.getElementById("preview_educationContent").insertAdjacentHTML("beforeend",prevString);
    //document.getElementById("education").insertAdjacentHTML("beforeend",formString);
    var ta = document.createElement("textarea");
    ta.setAttribute("class","form-control");
    var but = document.createElement("button");
    but.onclick="removeEducation("+id+")";
    but.setAttribute("type","button");
    but.textContent="Remove education";
    document.getElementById("education").appendChild(ta);
    document.getElementById("education").appendChild(but);
    //document.getElementById("preview_educationContent").appendChild(
     //   ta, but

    //);
    
    //var but = document.createElement("button");
    //but.onclick = (()=>{removeEducation(id)}\\\
    UpdateResume();
}
//window.addEducation = addEducation;
document.getElementById("addEducation").onclick=addEducation;


const addExperience =() =>{
    //add new blank experience
    workingResume=setNestedPropertyValue(workingResume,paths["experienceContent"],Experience());
    var id=getUniqueId("experience");

    var prevString = Components.ExperiencePreview(getNestedPropertyValue(workingResume,"content.experienceContent"), id);
    var formString = `
    <div id="experience`+ id + `">
        <textarea class="form-control" aria-label="" placeholder="Write here..." ></textarea> 

       
        <button type="button" onclick="removeEducation(`+id+`)">Remove experience</button>
    </div>
`
    document.getElementById("preview_experienceContent").insertAdjacentHTML("beforeend",prevString);
    document.getElementById("experience").insertAdjacentHTML("beforeend",formString);
    //var but = document.createElement("button");
    //but.onclick=(()=>{removeExperience(id)});\
    UpdateResume();
}

document.getElementById("addExperience").onclick=addExperience;





function getUniqueId(prefix) {
    var i = 0;
    console.log(prefix+i);
    while(document.getElementById(prefix+i)!=null) {
        i++;
    }
    return i;
}

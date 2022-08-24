import {Resume,Education,Experience, Style} from './resume_data.js';
import * as Components from './resume_components.js';

window.workingResume = null;
let changed = {
    name: {
        firstName:false,
        middleName:false,
        lastName:false,
        suffix:true,
    },

    //contact:{
        phoneNumber:false,
        email:false,
        website:false,
       // address: {
            street:false,
            state:false,
            city:false,
            zipcode:false,
        //}
    //},
    experienceContent:false,
    educationContent:false,

    objectiveContent:false,


    skillsContent:false,
    awardsContent:false
}
let paths = {

        firstName:"content.name.firstName",
        middleName:"content.name.middleName",
        lastName:"content.name.lastName",
        suffix:"content.name.suffix",

        phoneNumber:"content.contact.phoneNumber",
        email:"content.contact.email",
        website:"content.contact.website",
            street:"content.contact.street",
            state:"content.contact.state",
            city:"content.contact.city",
            zipcode:"content.contact.zipcode",
    experienceContent:"content.experienceContent",
    educationContent:"content.educationContent",

    objectiveContent:"content.objectiveContent",


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
    
    console.log("chiiii",changedKeys);
    

    Object.entries(paths).forEach(([key,value]) => {
        var path=value;
        console.log("val",value);
    	if(typeof path !== 'string') {
    		path=window.workingResume[s[s.length-2]][key];
    		if(path===null || path === undefined) 
    			return;
    	}
        console.log(window.workingResume);
        var s = path.split(".");
        var last=s[s.length-1];
    	
        switch(last) {
            case "name":
            case "contact":
            case "address":
            case "educationContent":
            case "experienceContent":
                return;
        }
        
        var trail;
        console.log(s);
        
        if(s.includes("educationContent")) {
        	trail = document.getElementById(s[2]).getElementsByClassName(last)[0];
        }
        else if(s.includes("experienceContent")){
        	trail = document.getElementById(s[2]).getElementsByClassName(last)[0];
        }
        else {
        	trail = document.getElementById("preview_" + key)
        }

        console.log(key);
        console.log("trail",trail)
        trail.innerHTML = getNestedPropertyValue(window.workingResume,path);

        changed[key]=false;
        
    })  
}

window.onload = () => {
    window.workingResume = localStorage.getItem("workingResume");
    if(window.workingResume === null) {
        console.log("No resume in localStorage to be used as working resume...");
        window.workingResume=Resume();
    }

   // UpdateResume();
    console.log("Page Loaded.");
}

document.getElementById('editor-form').addEventListener('input', (event) => {
    var att = event.target.getAttribute('id');
    var id=att;
    var p;
    if(att===null || att===undefined) {
    	var classList = event.target.classList;
    	var ancestor;
    	if(classList.contains("experience")) {
    		ancestor=event.target.closest('.experienceBlock');
    		
    	}
    	else if(classList.contains("education")) {
			ancestor=event.target.closest('.educationBlock');
		}
		
		id=ancestor.id;
		
		p=classList[2];
    }
    else {
		if(att.includes("preview")) {
			var parts = att.split("_");
		id = parts[parts.length-1];
		}
    }
    
    
    
    var classList = event.target.classList;
    console.log("id",id);
    console.log("changed",changed);
    console.log("paths",paths);
    //console.log("path",(window.workingResume,paths.experienceContent[id]));
    if(classList.contains("experience")) {
    	window.workingResume=setNestedPropertyValue(window.workingResume,(paths[id])[p],event.target.value);
    }
    else if(classList.contains("education")) {
    	window.workingResume=setNestedPropertyValue(window.workingResume,(paths[id])[p],event.target.value);
    }
    else {
    	console.log("ppp",paths[id]);
    	window.workingResume=setNestedPropertyValue(window.workingResume,paths[id],event.target.value);
    }
    //changed.setNestedPropertyValue
    changed[id]=true;

    UpdateResume();
    
});

function setNestedPropertyValue(obj, fields, val)
{
	console.log("Setting path " + fields + " equal to " + val);
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

function getUniqueId(prefix) {
    var i = 0;
    while(document.getElementById(prefix+i)!=null) {
        i++;
    }
    return i;
}

function addExperience() {
    var id=getUniqueId("experience");
    // Get type of element from form
    console.log(window.workingResume);
    window.workingResume.content.experienceContent["experience"+id]=Object.assign(id,Experience());
    let type = document.
        getElementById("experienceTemplate").cloneNode(true);

    type.setAttribute("id","experience"+id);
    type.setAttribute("style","visiblity: visible; display:inline;");
    
    type.setAttribute("class","experienceBlock");
    type.getElementsByTagName("button")[0].setAttribute("onClick","removeExperience('"+id+"')");
    //document.getElementBy
    let prev = document.getElementById("preview_experience_template").cloneNode(true);
    prev.setAttribute("id","preview_experience"+id);
    prev.setAttribute("style","visiblity: visible; display:inline;");
    
    //prev.setAttribute("class","experienceBlock");
    //prev.getElementsByTagName("button")[0].setAttribute("onClick","removeExperience('"+id+"')");
    

    document.getElementById(
        "experience").appendChild(type);
    document.getElementById(
    	"preview_experience").appendChild(prev);
    
    console.log(Object.keys(window.workingResume.content.experienceContent["experience"+id]))
    paths["experience"+id] = {};
    Object.keys(window.workingResume.content.experienceContent["experience"+id]).forEach((key)=>{
    	console.log();
    	
    	paths["experience"+id][key] = "content.experienceContent.experience" + id + "." + key;
    	changed["experience"+id] = Object.assign(key,true);
    });
    console.log("paths",paths);
    


}

function removeExperience(id) {
    console.log("game",window.workingResume.content.experienceContent["experience"+id]);
    delete window.workingResume.content.experienceContent["experience"+id];
    var chi = document.getElementById("experience"+id);
    var par = chi.parentNode;
    par.removeChild(chi);
    chi = document.getElementById("preview_experience"+id);
    par = chi.parentNode;
    par.removeChild(chi);
    console.log( window.workingResume);
    
    delete changed["experience"+id];
    delete paths["experience"+id];
}

function addEducation() {
    var id=getUniqueId("education");
    // Get type of element from form
    console.log(window.workingResume);
    window.workingResume.content.educationContent["education"+id]=Object.assign(id,Education());
    let type = document.
        getElementById("educationTemplate").cloneNode(true);

    type.setAttribute("id","education"+id);
    type.setAttribute("style","visiblity: visible; display:inline;");
    type.setAttribute("class","educationBlock");
    type.getElementsByTagName("button")[0].setAttribute("onClick","removeEducation('"+id+"')");
    
    let prev = document.getElementById("preview_education_template").cloneNode(true);
    prev.setAttribute("id","preview_education"+id);
    prev.setAttribute("style","visiblity: visible; display:inline;");
    //document.getElementBy
    // Use value as textnode in this example
    //type.appendChild(
    //    document.createTextNode(value));

    // Append as child to the parent
    // tag i.e. ol
    document.getElementById(
        "education").appendChild(type);
    document.getElementById(
    	"preview_education").appendChild(prev);
        
    paths["education"+id] = {};//Object.assign("content.educationContent.education" + id);
    Object.keys(window.workingResume.content.educationContent["education"+id]).forEach((key)=>{
    	paths["education"+id][key] = "content.educationContent.education" + id + "." + key;
    	changed["education"+id] = Object.assign(key,true);
    });


}

function removeEducation(id) {
    console.log("game",window.workingResume.content.educationContent["education"+id]);
    delete window.workingResume.content.educationContent["education"+id];
    var chi = document.getElementById("education"+id);
    var par = chi.parentNode;
    par.removeChild(chi);
    chi = document.getElementById("preview_education");
    par = chi.parentNode;
    par.removeChild(chi);
    console.log( window.workingResume);
    
    delete changed["education"+id];
    delete paths["education"+id];
}



window.removeExperience=removeExperience;
window.addExperience=addExperience;

window.removeEducation=removeEducation;
window.addEducation=addEducation;

//https://stackoverflow.com/questions/4658927/javascript-obtain-outer-parent-id-div
function hasParentWithId(obj, id) {
  var o = obj;
  while(o.id) {
  	if(id==o.id) {
    	return true;
    }
    o = o.parentNode;
  }

  return false;
}

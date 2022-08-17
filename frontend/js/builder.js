import {Resume,Education,Experience, Style} from './resources.js';

let workingResume = null;
document.onload = () => {
    if(localStorage.getItem("workingResume") == null) {

    }
    workingResume = localStorage.getItem("workingResume");
}

function ResumeToJson(resume) {
    return JSON.stringify(resume);
}

function JsonToResume(json) {
    return JSON.parse(json);
}

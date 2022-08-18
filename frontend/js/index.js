import {Resume,Education,Experience} from './resources.js';

let id = "example";
let totalResumes = 0;

function OpenResumeBuilder(resume) {
    localStorage.setItem("workingResume",resume);
    console.log(localStorage.getItem("workingResume"));
    window.location = "../pages/builder.html#" + resume.id;
}

function CreateNewResume() {
    var res = Resume();
    res.resume_id = id;
    OpenResumeBuilder(res);
    var resumeList = document.getElementById("resume-list");
    resumeList.append("<div class='resume-link' id=resume_" + id  + "></div>");

}

function SelectResume(id) {
    var resumeList = document.getElementById("resume-list");
}

window.OpenResumeBuilder = OpenResumeBuilder;
window.CreateNewResume = CreateNewResume;



import {Resume,Education,Experience} from './resources.js';

let id = "example";

function OpenResumeBuilder(resume) {
    localStorage.setItem("workingResume",resume);
    console.log(localStorage.getItem("workingResume"));
    window.location = "../pages/builder.html#" + resume.id;
}

function CreateNewResume() {
    var res = Resume();
    res.resume_id = id;
    OpenResumeBuilder(res);
}

window.OpenResumeBuilder = OpenResumeBuilder;
window.CreateNewResume = CreateNewResume;



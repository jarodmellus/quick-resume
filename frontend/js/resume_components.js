//+exp.responsiblities.map((element)=>{"<li class='preview_experience-bullet'>"+element+"</li>"}) +
const ExperiencePreview = (exp, id) => {
    return (
        `
        <div id=preview_experience` + id + `>
            <h2 class='preview_company-name'>`+ exp.company +`<h2>
            <h3 class='preview_job-title'>`+exp.job_title+`<h3>
            <p class='preview_job-location'>`+exp.city+', '+exp.state+`</p>
            <p class='preview_job-date'>`+exp.start_month+" "+exp.start_year+"-"+exp.end_month+" "+exp.end_year+`</p>
            <lu class='preview_experience-bullet-list'>` +
            
            `</lu>
        <div>
        `
    )
}

//+ edu.degrees.map((element)=>{"<li class='preview_education-bullet'>"+element+"</li>"}) +
const EducationPreview = (edu,id) => {
    console.log(edu,id);
    return (
        `
        <div id='preview_education`+id+`'>
            <h2 class='preview_school-name'>` + edu.school_name +`<h2>
            <p class='preview_school-location'>`+edu.city+', '+edu.state+`</p>
            <p class='preview_school-date'>`+edu.start_month+" "+edu.start_year+"-"+edu.end_month+" "+edu.end_year+`</p>
            <p class='preview_gpa'>`+edu.gpa+`</p>
            <lu class='preview_education-bullet-list'>`+
            
            `</lu>
        <div>
        `
    )
}

const EducationForm = (id) => {
    return (
        `
        <div id="education`+ id + `">
            <textarea class="form-control" aria-label="" placeholder="Write here..." ></textarea> 

            <button id="removeEducation`+id+`" type="button"  >Remove education</button>
        </div>`
    )
}

const ExperienceForm = (id) => {
    return (
        `
        <div id="experience`+ id + `">
            <textarea class="form-control" aria-label="" placeholder="Write here..." ></textarea> 
 
           
            <button id="removeExperience`+id+`" type="button" >Remove experience</button>
        </div>
`
    )
}

const ListForm = (id,str) => {
    return (
        `
        <div id="experience" + `+ id + `>
            <textarea class="form-control" aria-label="" placeholder="Write here..." ></textarea> 
            <button type="button" onclick="">Add another experience</button>
            </div>
            <button type="button" onclick="CreateNewExperience();">Add another experience</button>
        </div>
`
    )
}



export {ExperienceForm, EducationForm, ExperiencePreview, EducationPreview, ListForm}



const ExperienceComponent = (exp, id) => {
    return (
        `
        <div id=experience` + id + `>
            <h2 class='company-name'>`+ exp.company +`<h2>
            <h3 class='job-title'>`+exp.job_title+`<h3>
            <p class='job-location'>`+exp.city+', '+exp.state+`</p>
            <p class='job-date'>`+exp.start_month+" "+exp.start_year+"-"+exp.end_month+" "+exp.end_year+`</p>
            <lu class='experience-bullet-list'>` 
            +exp.responsiblities.map((element)=>{"<li class='experience-bullet'>"+element+"</li>"}) +
            `</lu>
        <div>
        `
    )
}

const EducationComponent = (edu, id) => {
    return (
        `
        <div class='education'>
            <h2 class='school-name'>` + edu.school_name +`<h2>
            <p class='school-location'>`+edu.city+', '+edu.state+`</p>
            <p class='school-date'>`+edu.start_month+" "+edu.start_year+"-"+edu.end_month+" "+edu.end_year+`</p>
            <p class='gpa'>`+edu.gpa+`</p>
            <lu class=education-bullet-list>`
            + edu.degrees.map((element)=>{"<li class='education-bullet'>"+element+"</li>"}) +
            `</lu>
        <div>
        `
    )
}

export {ExperienceComponent, EducationComponent}



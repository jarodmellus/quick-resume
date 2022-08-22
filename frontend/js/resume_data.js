const Education = () => {
    return {
        school_name:"",
        school_state:"",
        school_start_month:"",
        school_end_month:"",
        school_start_year:"",
        school_end_year:"",
        school_city:"",
        school_state:"",
        gpa:"",
        degrees: [],
    }
}

const Resume = () => {
    return {
        data : {
            resume_id : "",
            style : Style(),
        },
        content : {
            name : {
                firstName: "",
                middleName: "",
                lastName: "",
                suffix: "",
            },
            contact : {
                phoneNumber : "",
                email : "",
                website : "",
                address : {
                    street : "",
                    state : "",
                    city : "",
                    zipcode : "",
                }
            },
            objectiveContent: "",
            experienceContent : [],
            educationContent : {      
                school_name:"",
                school_state:"",
                school_start_month:"",
                school_end_month:"",
                school_start_year:"",
                school_end_year:"",
                school_city:"",
                school_state:"",
                gpa:"",
                degrees: [],
            },
            skillsContent : [],
            awardsContent : []
        }
    }
}

const Experience = () => {
    return {
        job_title:"",
        company:"",
        state:"",
        start_month:"",
        end_month:"",
        start_year:"",
        end_year:"",
        city:"",
        state:"",
        responsiblities:[]
    }
}

const Style = () => {
    return {
        horizontal_margins:0,
        vertical_margins:0,
        sections : {
            title:SectionStyle(),   
            headings:SectionStyle()
        }
    }
}

const SectionStyle = () => {
    return {
        font_family:"Arial",
        font_size:12,
        bold:false,
        italics:false,
        underline:false,
        align:"left",
        color:"#000000",
        bulleted:false,
        bullet_style:""
    }
}

export {Resume, Experience, Education, Style, SectionStyle};
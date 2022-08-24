const Resume = () => {
    return {
        data : {
            name : "",
            style : Style(),
        },
        content : {
            name : {
                first: "",
                middle: "",
                last: "",
                suffix: "",
            },
            contact_section : {
                telephone : "",
                email : "",
                website : "",
                address : {
                    street : "",
                    state : "",
                    city : "",
                    zipcode : "",
                }
            },
s
            objective:"",
            experienceContent : {},
            educationContent : {},
            skillsContent : {},
            awardsContent : {},
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
        responsiblities:[],
    }
}

const Education = () => {
    return {
        school_name:"",
        degrees: [],
        state:"",
        start_month:"",
        end_month:"",
        start_year:"",
        end_year:"",
        city:"",
        state:"",
        gpa:"",
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

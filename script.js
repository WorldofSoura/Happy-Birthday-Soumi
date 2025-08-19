const step1 = document.querySelector('.step1'),
step2 = document.querySelector('.step2'),
step3 = document.querySelector('.step3');
emailAddress = document.getElementById("emailAddress"),
verifyEmail = document.getElementById("verifyEmail"),
inputs = document.querySelectorAll(".otp-group input"),
nextButton = document.querySelector(".nextButton");
verifyButton = document.querySelector(".verifyButton");
let OTP = "";
window.addEventListener("load", () =>{
    emailjs.init("7GT_XYx5kLYgWk6Md");
    step2.style.display = "none";
    step3.style.display = "none";
    nextButton.classList.add("disable");
    nextButton.classList.add("disable");
});

const validateEmail = (email) => {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    if (re.test(email)){
        nextButton.classList.remove("disable");
    }else{
        nextButton.classList.add("disable");
    } 
};

const generateOTP = ()=>{
    return Math.floor(1000 + Math.random() * 9000);
};

inputs.forEach((input,index)=>{
    input.addEventListener("keyup", function (e) {
        if(this.value.length>=1){
            e.target.value = e.target.value.substr(0,1);
        }
        if(this.value.length === 1 && index < inputs.length - 1){
            inputs[index + 1].focus();
        }
            if(inputs[0].value.trim() !=" " && inputs[1].value.trim() != "" && inputs[2].value.trim()!="" && inputs[3].value.trim()!=" "){
                verifyButton.classList.remove("disable");
            }else{
                verifyButton.classList.add("disable");
            }
    });
    input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value === "" && index > 0) {
            inputs[index - 1].focus();
        }
    });

});

const serviceId = "service_v1yszmh";
const templateId = "template_vkdqyfv";
nextButton.addEventListener("click",()=>{
    OTP = generateOTP();
    nextButton.innerHTML = "&#9889; Sending...";
    let templateParameter = {
        from_name:"Soura's Creation",
        passcode: OTP,
        // message:"",
        reply_to: emailAddress.value, 
    }
    emailjs.send(serviceId,templateId, templateParameter).then
    ((res)=>{
        console.log(res);
        nextButton.innerHTML = "next &rarr;";
        step1.style.display="none";
        step2.style.display="block";
        step3.style.display="none";
    },
    (err) =>{
        console.log(err);
    });
});

verifyButton.addEventListener("click",()=>{
    let values ="";
    inputs.forEach((input)=>{
        values+=input.value;
    });

    if(OTP == values){
        step1.style.display="none";
        step2.style.display="none";
        step3.style.display="none";
        window.location.href = "index1.html";
    }else{
        verifyButton.classList.add("error-shake");

        setTimeout(() =>{
            verifyButton.classList.remove("error-shake");
        },1000);
    }
});

function changeMyEmail(){
    step1.style.display="block";
    step2.style.display="none";
    step3.style.display="none";
}

            // if(inputs[0].value!=" " && inputs[1].value!= "" && inputs[2].value!="" && inputs[3].value!=" "){
            //     verifyButton.classList.remove("disable");
            // }else{
            //     verifyButton.classList.add("disable");
            // }
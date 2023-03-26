const nav_list = document.querySelector(".nav_list");
const close = document.querySelector(".close");
const menu = document.querySelector(".menu");
const options = document.querySelector(".options");

menu.addEventListener("click",()=>{
    nav_list.classList.add("active");
})


close.addEventListener("click",()=>{
    nav_list.classList.remove("active");
})


const start_btn = document.querySelector(".start_btn");
const exit_btn = document.querySelector(".exit_btn");
const continue_btn = document.querySelector(".continue_btn");  
const rules_popup = document.querySelector(".rules_popup");   
const quiz_popup = document.querySelector(".quiz_popup");
const quiz_content = document.querySelector(".quiz_content");

start_btn.onclick =()=>{
    rules_popup.classList.add("active");
}

exit_btn.onclick =()=>{
    rules_popup.classList.remove("active");
}
  
continue_btn.onclick =()=>{
    rules_popup.classList.remove("active");
    quiz_popup.classList.add("activequiz");
    showQuestions(0);
    que_counter(1);
}



let que_count = 0;
let  que_numb = 1;
const nextbtn = document.querySelector(".nextbtn");
nextbtn.onclick =()=>{
  if(que_count < questions.length -1){
    que_count++;
    que_numb++;
    showQuestions(que_count);
    que_counter(que_numb);
  }else{
    alert("finished")
  }
    
}
 
function showQuestions(index){
    const question = document.querySelector(".question");  
    const options = document.querySelector(".options");
     let que_tag =  '<span>' + questions[index].numb + "." + questions[index].question+'</span>';
     let option_tag =  ' <div class="option"> <span>'+ questions[index].options[0]+'</span> </div>'
                      + ' <div class="option"> <span>' + questions[index].options[1]+'</span> </div>'
                      + ' <div class="option"> <span>' + questions[index].options[2]+'</span> </div>'
                      + ' <div class="option"> <span>'+ questions[index].options[3]+'</span> </div>'
     question.innerHTML = que_tag;  
     options.innerHTML = option_tag;  
     
     
     const option = options.querySelectorAll(".option");
     for(let i=0;i < option.length ; i++){
        option[i].setAttribute("onclick","checker(this)");
     } 
    
} 

let tickicon = '<div class="icon tick"><i class="uil uil-check"></i></div></div>'
let  crossicon = '<div class="icon  cross"><i class="uil uil-times"></i></div></div>'

function checker(userOption) {
    let userSolution = userOption.innerText; 
     let alloptions = options.children.length; 
    if (userSolution === questions[que_count].answer) {
        userOption.classList.add("correct"); 
        userOption.insertAdjacentHTML("beforeend",tickicon);
    } else {
        userOption.classList.add("wrong");  
        userOption.insertAdjacentHTML("beforeend", crossicon);
        for(let i=0; i <alloptions ; i++){
            if(options.children[i].innerText == questions[que_count].answer){
                options.children[i].setAttribute("class","option correct");
            } 
         }
        
    }

    for(let i=0;i<alloptions;i++){
       options.children[i].classList.add('disable');
    }
}

  








function que_counter(index){
    const total_queue =  quiz_content.querySelector(".total_queue");
    let  totalquestions = '<span>'+index+'</span> of  <span>' +questions.length + '</span>' + ' Questions' 
    total_queue.innerHTML=totalquestions;
}
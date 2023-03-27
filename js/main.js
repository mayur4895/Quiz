const nav_list = document.querySelector(".nav_list");
const close = document.querySelector(".close");
const menu = document.querySelector(".menu");
const options = document.querySelector(".options");
const timer_count = document.querySelector(".timer_count .time");
const timeLine = document.querySelector(".time_line"); 
const timer_left =document.querySelector(".timer_left"); 
 


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
    startTimer(15);
    startTimerLine(0);
}



let que_count = 0;
let  que_numb = 1;
let counter;
let counterLine;
let start_time = 15;
let widthval = 0;
let userscore = 0;

const nextbtn = document.querySelector(".nextbtn");
const result_popup = document.querySelector(".result_popup"); 
const restart_quiz = document.querySelector(".restart"); 
const quitquiz = document.querySelector(".quit"); 

quitquiz.onclick=()=>{
    window.location.reload();
}
restart_quiz.onclick=()=>{ 
    quiz_popup.classList.add("activequiz"); 
    result_popup.classList.remove('active'); 
    que_count = 0;
    que_numb = 1;  
    start_time = 15;
    widthval = 0; 
    userscore = 0;
    showQuestions(que_count);
    que_counter(que_numb);
    clearInterval(counter);
    startTimer(start_time);
    clearInterval(counterLine);
    startTimerLine(widthval);
    nextbtn.classList.remove('active');
    nextbtn.classList.remove('active');
}
 

nextbtn.onclick =()=>{
  if(que_count < questions.length -1){
    que_count++;
    que_numb++;
    showQuestions(que_count);
    que_counter(que_numb);
    clearInterval(counter);
    startTimer(start_time);
    clearInterval(counterLine);
    startTimerLine(widthval);
    nextbtn.classList.remove('active');
  }else{
    showResultBox();
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
        userscore +=1;
        console.log(userscore);
        userOption.classList.add("correct"); 
        userOption.insertAdjacentHTML("beforeend",tickicon); 
    } else { 
        userOption.classList.add("wrong");  
   
        for(let i=0; i <alloptions ; i++){
            if(options.children[i].innerText == questions[que_count].answer){
                options.children[i].setAttribute("class","option correct");
                userOption.insertAdjacentHTML("beforeend", crossicon);
            } 
         }
        
    }

    for(let i=0;i<alloptions;i++){
       options.children[i].classList.add('disable');
    }  
    nextbtn.classList.add('active');  
} 
  
function showResultBox(){
    rules_popup.classList.remove("active");
     quiz_popup.classList.remove("activequiz");
     result_popup.classList.add("active");
 const score_text = document.querySelector(".score_text");
 if(userscore > 3){
    score_text.innerHTML = ' <span> and  Congrates! , you got  <p>'+userscore +'</p>  out of <p>5</p> </span>';
 }else if(userscore > 1){
    score_text.innerHTML = ' <span> and nice , you got  <p>'+userscore +'</p>  out of <p>5</p> </span>';
 }else{
    score_text.innerHTML = ' <span> and sorry , you got only <p>'+userscore +'</p>  out of <p>5</p> </span>';
 }
}



function que_counter(index){
    const total_queue =  quiz_content.querySelector(".total_queue");
    let  totalquestions = '<span>'+index+'</span> of  <span>' +questions.length + '</span>' + ' Questions' 
    total_queue.innerHTML=totalquestions;
}


function startTimer(time){

    counter = setInterval(timer ,1000)
    function  timer(){
     timer_count.innerText = time;
     time--;

     if(time < 9){
        let addzero = timer_count.innerText;
        timer_count.innerText = "0" + addzero;
     }
     if(time < 0){
        clearInterval(counter);
        timer_count.innerText = "00";
        timer_left.innerText = "Time off";
        let alloptions = options.children.length; 
        for(let i=0; i <alloptions ; i++){
            if(options.children[i].innerText == questions[que_count].answer){
                options.children[i].setAttribute("class","option correct");
                userOption.insertAdjacentHTML("beforeend", crossicon);
            } 
            for(let i=0;i<alloptions;i++){
                options.children[i].classList.add('disable');
             }  
             nextbtn.classList.add('active');  
         }
       
        
     }
    }
}

 
function startTimerLine(time){

    counterLine = setInterval(timer , 29)
    function  timer(){
        time += 1;
        timeLine.style.width = time + "px";
     if(time >  549){
             clearInterval(counterLine);
     }
     
    }
}
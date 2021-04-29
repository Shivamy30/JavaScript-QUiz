


$('#resultScreen').hide();
let index = 0;
let attemt = 0;
let score = 0;
let wrong = 0;

let timer=0;
let totalQues=0,left=0;

window.onload = function () {
   
    show();

}
let ques = questions;
function newidx() {
    let i = Math.floor(Math.random() * 23);
    return i;
}

function showResult () {
    $('#quizBox').hide();
    $('#resultScreen').show();
     let user= sessionStorage.getItem("name");
     document.querySelector(".users").innerHTML=user;
      $("#attemptQuestion").text(attemt);
      $("#correctAnswers").text(score);
      $("#wrongAnswers").text(wrong);
      $("#leftAnswers").text(left);
     
     // location.href= "end.html";
     return;
 
     console.log('hello');
 }

function submitForm(e){
    e.preventDefault();
    let user= document.forms["form"]["name"].value;
    sessionStorage.setItem("name",user);
     window.location.href= 'quiz.html';
}
function calAns() {
    let opt = document.querySelectorAll('span#opt');
    for (let i = 0; i < opt.length; i++) {
        if (opt[i].classList.contains("active")) {
            checkAnswer(opt[i]);
            opt[i].classList.remove("active");
            return;
        }
    }
    left++;
}


function show() {

    let totalTime = 30;
    let min = 0;
    let sec = 0;
    let counter = 0;
    let user= sessionStorage.getItem("name");
    document.querySelector(".name").innerHTML= user;
    timer = setInterval(function () {
        counter++;
        min = Math.floor((totalTime - counter) / 60);
        sec = totalTime - min * 60 - counter;
        let time = document.getElementById('timer');
        time.innerHTML = (min + ":" + sec);
        if (counter == totalTime) {
            clearInterval(timer);
            setTimeout(() => {
                calAns();
                if((attemt+left)==10){
                    setTimeout(()=>{
                        showResult();
                    },400)
                }
                else{
                    setTimeout(()=>{
                        show();
                    },500)
                }
            }, 1000);
        }
    }, 1000);
    index = newidx();
    printQuestion(index);
};

function printQuestion(i) {
    $(".questionBox").text(`Q.${attemt+left+1} ${questions[i].question}`);
    $(".optionBox span").eq(0).text(ques[i].options[0]);
    $(".optionBox span").eq(1).text(ques[i].options[1]);
    $(".optionBox span").eq(2).text(ques[i].options[2]);
    $(".optionBox span").eq(3).text(ques[i].options[3]);

}


function checkAnswer(option) {
    attemt++;
    let optionClicked = $(option).data("opt");
    let ans = (ques[index].options[optionClicked - 1]);
    if (ans == ques[index].answer) {
        score++;
        option.classList.add("correct");
        setTimeout(()=>{
            option.classList.remove("correct");
        },300)
        
        let curr = document.getElementById('score');
        curr.innerHTML = score;
    } else {
        wrong++;
        option.classList.add("wrong");
        setTimeout(()=>{
            option.classList.remove("wrong");
        },300)
    }

}

function toggleActive(data) {
    let is = data.classList.contains("active");
    if (is) {
        data.classList.remove("active");
    } else {
        let opt = document.querySelectorAll('span#opt');
        for (let i = 0; i < opt.length; i++) {
            if (opt[i].classList.contains("active")) {
                opt[i].classList.remove("active");
            }
        }
        data.classList.add("active");
    }

}

function next() {
   calAns();
    clearInterval(timer);
    if((attemt+left)==10){
        setTimeout(()=>{
            showResult();
        },400)
    }
     else{
         setTimeout(()=>{
             show();
         },500)
     }

}

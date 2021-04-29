
 import res from './timer.js';

console.log(attemt);

function showResult (){
    console.log("insilde");
  //  $("#totalQuestion").text();
    $("#attemptQuestion").text(attemt);
    $('#correctAnswers').text(score);
     $("#wrongAnswers").text(wrong);
     $("#leftAnswers").text(left);
     return;
}

module.exports={
    showResult
}
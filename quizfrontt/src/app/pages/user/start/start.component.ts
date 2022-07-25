import { LocationStrategy } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
qid;
questions;
marksGot=0;

correctAnswer=0;
attempted=0;
timer:any;
isSubmit=0;


  constructor(
   private _route:ActivatedRoute,
    private locationSt:LocationStrategy,
    private _question:QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
  }
loadQuestions(){
  this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
    (data:any)=>{
    this.questions=data;
this.timer=this.questions.length*60;
    this.questions.forEach((q) => {
      q['givenAnswer']='';
    });


    this.startTimer();
    console.log(this.questions);
    },
    (error)=>{
      Swal.fire("Error in loading question of quiz",'','error');
    }
    )
  
}

  preventBackButton(){
    history.pushState(null,null,location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,null,location.href);
    });
  }

  submitQuiz(){

    Swal.fire({
      title: 'Do you want to submit the Quiz?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Submit '
    }).then((result) => {
      this.isSubmit=1;
      if (result.isConfirmed) {
        this.evalQuiz();
      }
    
    })
  
  }

  startTimer(){
    let tt=window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
      clearInterval(tt);
      }else{
        this.timer--;
      }

    },1000)
  }
getFormattedTimer(){
  let mm=Math.floor(this.timer/60)
  let ss=this.timer-mm*60;
  return `${mm} min :${ss} sec`
}

evalQuiz(){
  Swal.fire(
    'Quiz Submmited!',
    '',
    'success'
  )
  this.questions.forEach(g=>{
    if(g.givenAnswer==g.answer){
      this.correctAnswer++;
    let marksSingle=  this.questions[0].quiz.maxMarks/this.questions.length
  this.marksGot+=marksSingle;  
  }
  if(g.givenAnswer.trim()!=''){
    this.attempted++;
  }

  }) 
  console.log("Correct Answers :"+this.correctAnswer);
  console.log("Marks :"+this.marksGot);
 console.log( this.questions);
 console.log(this.attempted);
}

}

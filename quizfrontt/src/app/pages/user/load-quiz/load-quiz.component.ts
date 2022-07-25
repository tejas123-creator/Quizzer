import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
 catId;
 quizzes;
  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService
  ) {}

  ngOnInit(): void {

this._route.params.subscribe((params)=>{
console.log(params);
this.catId=params.catId;

console.log(this.catId);
if(this.catId==0){
  
  console.log("Load all the quiz ");
this._quiz.quizzes().subscribe(
(data:any)=>{
this.quizzes=data;
console.log(this.quizzes);

},
(error)=>{
Swal.fire("Error in loading data !!","",error);
}
)


}else{
  console.log("Load Specific quiz ");
this._quiz.getQuizzesOfCategory(this.catId).subscribe(
  (data:any)=>{
    this.quizzes=data;
  },
  (error)=>{
    alert("Error in loading data");
  }
)
}
})
  

  }
}
function params(params: any) {
  throw new Error('Function not implemented.');
}

function zz() {
  throw new Error('Function not implemented.');
}


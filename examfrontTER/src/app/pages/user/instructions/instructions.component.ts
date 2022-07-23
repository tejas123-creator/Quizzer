import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
 qid;
 quiz;
  constructor(
   private _route:ActivatedRoute,
   private _quiz:QuizService,
   private _router:Router
  ) {}

  ngOnInit(): void {
   this.qid=this._route.snapshot.params.qid;
  //  console.log(this.qid);1

  this._quiz.getQuiz(this.qid).subscribe(
    (data:any)=>{
      console.log(data);
    this.quiz=data;
    },
    (error)=>{
      Swal.fire("Error is loading data",'',error);
    }
  )


  }
 startQuiz(){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't to start the quiz ?",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Start Quiz!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Quiz started!',
        '',
        'success'
      )
      this._router.navigate(['/start/'+this.qid]);

    }
  })

}
  
}

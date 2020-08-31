import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiService {
    private selectedQuestion = new Subject<any>();
    questionSelected = this.selectedQuestion.asObservable();

    private selectedQuiz = new Subject<any>();
    quizSelected = this.selectedQuiz.asObservable();

    constructor(private http: HttpClient) {}

    getQuestions(quizId){
        return this.http.get(`http://localhost:63101/api/questions/${quizId}`);
    }
    getQuizzes() {
        return this.http.get('http://localhost:63101/api/quizzes');
    }

    getAllQuizzes() {
        return this.http.get('http://localhost:63101/api/quizzes/all');
    }

    postQuestion(question){
        this.http.post('http://localhost:63101/api/questions', question).subscribe(res => {
            console.log(res)
        })
    }

    putQuestion(question) {
        this.http.put(`http://localhost:63101/api/questions/${question.id}`, question).subscribe(res => {
            console.log(res)
        })


    }

    postQuiz(quiz){
        this.http.post('http://localhost:63101/api/quizzes', quiz).subscribe(res => {
            console.log(res)
        })
    }

    putQuiz(quiz) {
        this.http.put(`http://localhost:63101/api/quizzes/${quiz.id}`, quiz).subscribe(res => {
            console.log(res)
        })
    }

    selectQuestion(question){
        this.selectedQuestion.next(question)
    }
    selectQuiz(quiz){
        this.selectedQuiz.next(quiz)

    }
}
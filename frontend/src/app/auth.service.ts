import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router} from '@angular/router'
import { Observable } from 'rxjs/Observable'
//import { catchError, map, tap } from 'rxjs/operators';

@Injectable()

export class AuthService {
    public error: any; 

    constructor(private http: HttpClient, private router: Router  ) {}

    get isAuthenticated() {
        return !!localStorage.getItem('token')

    }

    register(credentials){
        this.http.post<any>("http://localhost:63101/api/account", credentials).subscribe(res =>{
            this.authenticate(res)
        })
        

    }
  //  getData(): Observable<any[]>{
   //     return this.http.get<any>(this."http://localhost:63101/api/account").pipe(catchError(this.h

    //}


//signup() { 
//    return this.http.get<any>(this."http://localhost:63101/api/account").subscribe(success => {
//        console.log(success);
 //   }, error => { // second parameter is to listen for error
 //       console.log(error);
 //       this.error = error;
 //   });
//}


    login(credentials){
        this.http.post<any>("http://localhost:63101/api/account/login", credentials).subscribe(res =>{
            this.authenticate(res)
        })
    }

    authenticate(res){

        localStorage.setItem('token', res)
        this.router.navigate(['/'])

    }
    logout(){
        localStorage.removeItem('token')


    }
}
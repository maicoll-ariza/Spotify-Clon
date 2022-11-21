import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import  { CookieService }  from  'ngx-cookie-service'

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
  providers: [CookieService]
})
export class AuthPageComponent implements OnInit { 

  cookieService=inject(CookieService);
  
  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup ({})

  constructor(private _authService: AuthService, private router: Router) { }
    
  ngOnInit(): void {

    this.formLogin = new FormGroup(
      {
        email: new FormControl('test@test.com', [
        Validators.required,
        Validators.email
        ]),
        password: new FormControl ('12345678', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ]),
        
      }
    )
  }

  sendLogin(): void {
      const {email, password}= this.formLogin.value
      this._authService.sendCredentials(email,password)
      .subscribe( response => {
        console.log('Éxito', response);
        this.cookieService.set('token', response.tokenSession, 4,'/')
        this.router.navigate(['/', 'tracks'])
      }, err => {
        this.errorSession = true
      })   
  }

  

}

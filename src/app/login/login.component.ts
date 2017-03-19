import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 model: any = {};
  username: string;
  password: string;
    error = '';

    constructor(
        private router: Router,
        private authService: AuthService, private slimLoadingBarService: SlimLoadingBarService) { }

    ngOnInit() {
        // reset login status
        this.authService.logout();
    }
    login() {
      this.startLoading();
        this.authService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                  this.completeLoading();
                    this.router.navigate(['/home']);
                } else {
                    this.error = 'Username or password is incorrect';
                }
            });
    }
    startLoading() {
        this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
    }

    stopLoading() {
        this.slimLoadingBarService.stop();
    }
    completeLoading() {
        this.slimLoadingBarService.complete();
    }
}

import { Component } from '@angular/core';
import { CommonService } from './services/common.service';
import { forkJoin, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  password = '';

  constructor(private commonService: CommonService) {}

  pingServer() {
    const pingServerRequest = this.commonService.pingServer();

    forkJoin([pingServerRequest]).subscribe((results) => {
      console.log(results);
      if (results[0]?.messId === 'S') {
        window.alert(results[0]['messText']);
      } else {
        window.alert('Failure to establish connection to server...');
      }
    });
  }

  checkPasswordStrength() {
    if (this.password == '') {
      window.alert('Please enter a password to check.');
    } else {
      let body = {
        password: this.password,
      };

      const checkPassStrengthRequest =
        this.commonService.checkPasswordStrenth(body);

      forkJoin([checkPassStrengthRequest]).subscribe((results) => {
        console.log(results);
        if (results[0]?.messId === 'S') {
          window.alert('Your password strength is ' + results[0]['strength']);
        } else {
          window.alert('Failure to establish connection to server...');
        }
      });
    }
  }
}

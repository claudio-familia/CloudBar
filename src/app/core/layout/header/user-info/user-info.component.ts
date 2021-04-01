import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/security/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(){    
    this._authService.signOut();
  }

}

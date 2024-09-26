import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isLoggedIn: boolean = false;

  constructor(private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.getAuthStatus().subscribe(status => {
      this.isLoggedIn = status; // Atualiza o estado ao receber novas emissões
    });
  }

  onLogout() {
    this.loginService.logout(); 
  }

}

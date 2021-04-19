import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoke',
  templateUrl: './invoke.component.html',
  styleUrls: ['./invoke.component.scss']
})
export class InvokeComponent implements OnInit {
  activatedData: any;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      localStorage.clear();
      if (localStorage.getItem('currentUser')) {
        this.navigateToDashboard();
      } else {
      }
    });
  }

  ngOnInit() {
  }

 
  navigateToDashboard() {
    if (localStorage.getItem('currentUser')) {
      window.location.href = '/dashboard';
    }
  }

}

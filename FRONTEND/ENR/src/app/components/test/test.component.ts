import { Component, OnInit } from '@angular/core';

import { TestService } from 'src/app/service/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  laravelvar: string;

  constructor(private testservice: TestService) { }

  ngOnInit() {
    // obtenemos la variable laravel
    this.testservice.getLaravelVar().subscribe(
      response => {
        this.laravelvar = response;
      },
      err => {},
      () => {}
    );
  }


}

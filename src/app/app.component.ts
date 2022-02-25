import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DatabaseConfiguraion } from './database-config/db-config.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api-generator';

  constructor(private store:Store<{dbConfig:DatabaseConfiguraion}>){
  store.select('dbConfig').subscribe(e => console.log(e)
    )
  }
}

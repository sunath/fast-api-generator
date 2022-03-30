import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TabelServiceCode } from '../api-routers/service-generator';
import {TableProductModel} from '../data/table-product-model';
import { createMainFile } from './main-file.generator';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css']
})
export class FinalizeComponent implements OnInit {


  @Input('tables') tables:TableProductModel[] | undefined;


  @Input('routes') routes:TabelServiceCode[] = []


  @Input('modelsCode') modelsCode:string = ""
  @Input('schemasCode') schemasCode:string = ""


  mainFileContent:string = ""


  dbFileContent:string = ""

  constructor(private store:Store<{dbConfig:any}>) { 
    this.store.select('dbConfig').subscribe(e => {
        this.dbFileContent = e.file_text;
    })
  }

  ngOnInit(): void {
  }


  generate(){
    
    this.mainFileContent = createMainFile(this.routes)
  }
}

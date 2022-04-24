import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DatabaseTypes, DbTypeMetaData } from '../data/db-list';
import { DatabaseConfiguraion, database_setup_action, database_update_file } from './db-config.actions';
import { createDatabaseCode } from './db_file_generator';

@Component({
  selector: 'app-database-config',
  templateUrl: './database-config.component.html',
  styleUrls: ['./database-config.component.css']
})
export class DatabaseConfigComponent  implements OnInit{


  db_list:DbTypeMetaData[] = DatabaseTypes;


  previewCode = "";


  databaseConfigForm:FormGroup;


  constructor(fb:FormBuilder,private store:Store<{dbConfig:DatabaseConfiguraion}>) { 
    this.databaseConfigForm = fb.group({
      project_name:['',[Validators.required]],
      db_name:['',[Validators.required]],
      db_type:[this.db_list[0].dbName,[Validators.required]],
      db_server_url:['',[Validators.required]],
      db_username:['',[Validators.required]],
      db_password:['',[Validators.required]]
    })

    
  }
  ngOnInit(): void {
    this.onDbTypeChange()
    this.databaseConfigForm.valueChanges.subscribe(e => {
      this.previewCode = createDatabaseCode({...this.databaseConfigForm.value,isSetup:true})  
      this.store.dispatch(database_update_file({text:this.previewCode}))
    })
  }



  onDbTypeChange(){
    
    const db_meta_data = this.db_list.filter(e => this.databaseConfigForm.get('db_type')?.value == e.dbName)[0]

    if(!db_meta_data.dbRequiredAuth){
      this.databaseConfigForm.get('db_server_url')?.disable()
      this.databaseConfigForm.get('db_username')?.disable()
      this.databaseConfigForm.get('db_password')?.disable()
    }else{
      this.databaseConfigForm.get('db_server_url')?.enable()
      this.databaseConfigForm.get('db_username')?.enable()
      this.databaseConfigForm.get('db_password')?.enable()
    }
    
  }

  next(){
    const newData:DatabaseConfiguraion = {isSetup:true,...this.databaseConfigForm.value,file_text:this.previewCode}
    this.store.dispatch(database_setup_action({details:newData}))

  }



}

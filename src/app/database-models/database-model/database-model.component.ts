import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ColumnTypes } from 'src/app/data/col-types';
import TableProductModel from 'src/app/data/table-product-model';
import { DatabaseColumn, DatabaseForeginKey } from '../database-col-meta';
import { modelClassGenerator } from '../model-class-generator';

@Component({
  selector: 'app-database-model',
  templateUrl: './database-model.component.html',
  styleUrls: ['./database-model.component.css']
})
export class DatabaseModelComponent implements OnInit {

  @Input('tableMetaData') tableMetaData:any;


  @Input('allTables') allTables:any[] = [];

  @Output('tableRemoveAction') tableRemoveAction = new EventEmitter();
  @Output('tableUpdateAction') tableUpdateAction = new EventEmitter<TableProductModel>();


  cols:DatabaseColumn[] = [];


  foreignKeys:DatabaseForeginKey[] = []


  code = ""


  dtypes = ColumnTypes;
 
  constructor() { }


  ngOnInit(): void {
  }

  removeSelf(){
    this.tableRemoveAction.emit(this.tableMetaData)
  }

  addColumn(){
    this.cols.push({id:new Date().getTime(),dtype:'String',isNullable:false,isUnique:true,name:''})
  }

  addForeignKey(){
    this.foreignKeys.push({table_name:"Unknwon",column_name:'unknown_key'})
  }


  removeForeignKey(x:any){
    const i = this.foreignKeys.indexOf(x)
    this.foreignKeys.splice(i,1)
  }


  checkForeignKey(){
    console.log(this.availableTablesForTable);
    
    console.log(this.allTables);
    
  }

  removeCol(colData:any){
    const index = this.cols.indexOf(colData)
    this.cols.splice(index,1)
  }
  tableName:string = ""


  logData(d:any){
    console.log(this.cols);    
  }

  generate(){
    this.code = modelClassGenerator(this.cols,this.tableName,this.foreignKeys)
    this.tableUpdateAction.emit({...this.tableMetaData,columns:this.cols,tablename:this.tableName,foreignKeys:this.foreignKeys})
  }

  get availableTablesForTable(){    
    return this.allTables.filter(e => e.tablename !== this.tableName)
  }

  checkAlreadyExistAForeignKey(name:string){
    return this.foreignKeys.filter(e => e.table_name !== name)[0] ? true : false
  }


}

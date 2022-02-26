import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ColumnTypes } from 'src/app/data/col-types';
import { DatabaseColumn } from '../database-col-meta';
import { modelClassGenerator } from '../model-class-generator';

@Component({
  selector: 'app-database-model',
  templateUrl: './database-model.component.html',
  styleUrls: ['./database-model.component.css']
})
export class DatabaseModelComponent implements OnInit {

  @Input('tableMetaData') tableMetaData:any;

  @Output('tableRemoveAction') tableRemoveAction = new EventEmitter();
  @Output('tableUpdateAction') tableUpdateAction = new EventEmitter();


  cols:DatabaseColumn[] = [];


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


  removeCol(colData:any){
    const index = this.cols.indexOf(colData)
    this.cols.splice(index,1)
  }
  tableName:string = ""


  logData(d:any){
    console.log(this.cols);    
  }

  generate(){
    this.code = modelClassGenerator(this.cols,this.tableName)
    this.tableUpdateAction.emit({...this.tableMetaData,columns:this.cols,tablename:this.tableName})
  }


}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import TableProductModel from '../data/table-product-model';
import { makeAPISchema } from './api-schemas-generator';
import CustomSchema from './custom-schema-model';

@Component({
  selector: 'app-api-schemas',
  templateUrl: './api-schemas.component.html',
  styleUrls: ['./api-schemas.component.css']
})
export class ApiSchemasComponent implements OnInit {


  @Input('tables') tables:TableProductModel[]| undefined;


  @Output('receiveSchemaFile') receiveSchemaFile = new EventEmitter()


  @Output('customSchemaChange') customSchemaChange = new EventEmitter<CustomSchema[]>();


  mockTables:TableProductModel[] = []


  



  customSchemas:CustomSchema[] = []


  nextID = 1;




  get availableTables()
{
    if (!this.tables) return [];
    return this.tables?.map(e => e.tablename)
}
   


  constructor() { }


  code:string = ""

  ngOnInit(): void {
    if(this.tables){
      this.mockTables = this.setupMockData() || []
      console.log(this.mockTables);
      
    }
    
  }


  setupMockData(){
    return this.tables?.map(e => {
      e.columns.push({
        dtype:'int',
        id:e.columns.length,
        isNullable:false,
        isUnique:true,
        name:'id'
      })

      return e
  });

  }

  generate(){
    if(!this.tables)return;
    this.code = makeAPISchema(this.tables)
    this.receiveSchemaFile.emit({code:this.code})
    
  }


  createNewCustomSchema(){
    if(!this.mockTables || this.mockTables.length <= 0){
      this.mockTables = this.setupMockData() || []
    }
    console.log(this.mockTables);
    
    this.customSchemas.push({targetModel:'',fields:[],schemaName:'',id:this.nextID})
    this.nextID +=1;
    
  }


  changeData($event:MatSelectChange){
    console.log($event.value);
  }


  getSchemaAvailableProperties(id:number){
      const tableNameSchema = this.customSchemas.filter(e => e.id === id)[0];
      const table = this.mockTables?.filter(e => e.tablename == tableNameSchema.targetModel)[0];
      const haveForeignKeys  = table && table?.foreignKeys.length >= 1;
      if (table){
        return !haveForeignKeys ?  table.columns.map(e => e.name).
        filter(e => tableNameSchema.fields.filter(x => x===e).length <= 0 ) : 
        [...table.columns.map(e => e.name),...table.foreignKeys.map(e=> e.column_name)]
        .filter(e => tableNameSchema.fields.filter(x => x===e).length <= 0)
      }
      return []
  }

  addPropToTheSchema(id:number,prop:MatSelect){
    let customSchema = this.customSchemas.filter(e => e.id === id)[0]
    customSchema.fields.push(prop.value)  
  }


  updateCustomSchema(){
    this.customSchemaChange.emit(this.customSchemas)
  }

  removeCustomSchema(id:number){
    const x = this.customSchemas.filter(e => e.id == id)[0]
    const index = this.customSchemas.indexOf(x);
    this.customSchemas.splice(index,1);
    this.customSchemaChange.emit(this.customSchemas)
  }

}

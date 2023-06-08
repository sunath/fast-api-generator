import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import {TableProductModel} from '../data/table-product-model';
import { makeAPISchema } from './api-schemas-generator';
import CustomSchema from './custom-schema-model';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-api-schemas',
  templateUrl: './api-schemas.component.html',
  styleUrls: ['./api-schemas.component.css']
})
export class ApiSchemasComponent implements OnInit {


  @Input('tables') tables:TableProductModel[]| undefined;
  mockTables:TableProductModel[] = []
  customSchemas:CustomSchema[] = []
  nextID = 1;
  get availableTables()
{
    if (!this.tables) return [];
    return this.tables?.map(e => e.tablename)
}
   
  constructor(public dataService:DataService) { }

  code:string = ""

  ngOnInit(): void {

    // if(this.tables){
    //   this.mockTables = this.setupMockData() || []
    //   console.log(this.mockTables);  
    // }

    if(this.dataService.tables){
      this.tables = this.dataService.tables
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
    // this.receiveSchemaFile.emit({code:this.code})
    
  }


  createNewCustomSchema(){
    if(!this.mockTables || this.mockTables.length <= 0){
      this.mockTables = this.setupMockData() || []
    }
    console.log(this.mockTables);
    

    if(!this.dataService.customSchemas){
      this.dataService.customSchemas = []
    }

    this.dataService.customSchemas.push({targetModel:'',fields:[],schemaName:'',id:this.nextID})
    this.nextID +=1;
    
  }


  changeData($event:MatSelectChange){
    console.log($event.value);
  }


  getSchemaAvailableProperties(id:number){
    // // @ts-ignore
    //   const tableNameSchema = this.dataService.customSchemas.filter(e => e.id === id)[0];
    //   // @ts-ignore
    //   const table = this.dataService.tables?.filter(e => e.tablename == tableNameSchema.targetModel)[0];
    //   const haveForeignKeys  = table && table?.foreignKeys.length >= 1;

    //   if (table){
    //     // @ts-ignore
    //     return !haveForeignKeys ?  table.columns.map(e => e.name).
    //     // @ts-ignore
    //     filter(e => tableNameSchema.fields.filter(x => x===e).length <= 0 ) : 
    //     // @ts-ignore
    //     [...table.columns.map(e => e.name),...table.foreignKeys.map(e=> e.column_name)]
    //     // @ts-ignore
    //     .filter(e => tableNameSchema.fields.filter(x => x===e).length <= 0)
    //   }
    //   return []

    const schema = this.dataService.customSchemas.filter(e => e.id == id)[0]
    const table = this.dataService.tables?.filter((e: { tablename: string; }) => e.tablename == schema.targetModel )[0];

    if(!table)return [];
    // @ts-ignore
    const props = table.columns.map(e => e.name).filter(e => schema.fields.filter(x  => x == e).length == 0)

    return props
    // return []
  }

  addPropToTheSchema(id:number,prop:MatSelect){
    // @ts-ignore
    let customSchema = this.dataService.customSchemas.filter(e => e.id === id)[0]
    customSchema.fields.push(prop.value)  
  }


  updateCustomSchema(){
    // this.customSchemaChange.emit(this.customSchemas)
  }

  removeCustomSchema(id:number){
    // @ts-ignore
    const x = this.dataService.customSchemas.filter(e => e.id == id)[0]
    const index = this.dataService.customSchemas.indexOf(x);
    this.dataService.customSchemas.splice(index,1);
    // this.customSchemaChange.emit(this.customSchemas)
  }

}

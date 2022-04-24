import { buildConditions } from './../api-condition-builder';
import { ConvertableTable } from './../convert-table-product-model';
import { AppDependModel, AppFunction } from './../../../depends/depend-model';
import { ActiveSchema } from './../active-schema';
import { TableProductModel } from 'src/app/data/table-product-model';
import { PostEndpointFunction } from './../api-router-custom/api-custom-def';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { generateSchemasNames } from '../../api-schema-struc';
import CustomSchema from 'src/app/api-schemas/custom-schema-model';
import createDBDepend from '../../db-depend';
import { FilterActions } from '../api-actions';
import { convertTableProductModelsToSchemas } from '../convert-table-product-model';
import { IApiFunctionStep } from '../depend_function_model';
import { FilterCondition } from '../api-condition-builder';
import { buildAPIFunction } from '../api-viewport-builder';
import { createPostObjects, createReturnNewObject, IDbCreateObject, createReturnNewObjects } from './api-post-db-create-object';

@Component({
  selector: 'app-api-post',
  templateUrl: './api-post.component.html',
  styleUrls: ['./api-post.component.css']
})
export class ApiPostComponent implements OnInit {


  @Output('deleteOwnView') deleteOwnView = new EventEmitter<PostEndpointFunction>()


  @Input('apiClass')
  apiClass!: PostEndpointFunction;

  @Input('tableProductModels')
  tablesProductModels!:TableProductModel[];

  @Input('customSchemas')
  customSchemas!:CustomSchema[];

  public dbModel:AppDependModel;
  public filterActions:string[];


  public schemaList:string[]  = []


  public schemaActiveList:ActiveSchema[] = []


  public nextSchemaVariableName:string = ""
  public nextSchemaName:string = ""


  //DB Depend Props
  public nextFunctionName:string = ""
  public nextFunctionList:AppFunction[];
  public nextQueryModelName:string = ""

  public currentQueryModelName:string = ""



  // Filter
  public nextFilterColumnName:string = ""
  public nextFilterAction:string = ""
  public nextFilterSchemaColumn:string = ""
  public postActions:IApiFunctionStep[] = []
  public bigSteps:IApiFunctionStep[][] = []


  public methodCode:string = ''
  public conditionCode:string = '' 
  public createObjectsCode:string = ''
  public returnObjectCode:string = ''




  //Creating Objects
  public nextCreateObject:string = ''
  public nextSchemaObject:string = ''
  public nextObjectTempName:string = ''
  public newObjects:IDbCreateObject[] = []
  public selectedReturnObjects:string[] = []


  // Response
  public returnModel:string = ''

  constructor() { 
    this.dbModel = createDBDepend('db');
    this.nextFunctionList = this.dbModel.functions;
    this.filterActions = FilterActions;
    
    
  }


  getWholeCode(){
    return this.wholeCode;
  }

  ngOnInit(): void {
    if(this.tablesProductModels.length >= 1){
      if(this.customSchemas.length >= 1){
        this.schemaList = [...generateSchemasNames(this.tablesProductModels),...this.customSchemas.map(e => e.schemaName) ]
      }else{
        this.schemaList = [...generateSchemasNames(this.tablesProductModels) ]
      }
      }
      this.apiClass.getEndPointString = this.getWholeCode;
  }



  data_reset():void{
    this.nextSchemaName = ''
    this.nextSchemaVariableName = ''

  }



  reset_filter_data(){
    this.nextFilterColumnName = ''
    this.nextFilterSchemaColumn = ''
    this.nextFilterAction = ''
  }


  reset_all_db_function(){
    this.nextFunctionList = this.dbModel.functions;
  }


  addSchema():void{
    this.schemaActiveList.push({variableName:this.nextSchemaVariableName,schemaName:this.nextSchemaName,isCustomSchema:false})
    this.data_reset()
    
  }

  deleteActiveSchema(e:ActiveSchema){
    this.schemaActiveList.splice(this.schemaActiveList.indexOf(e),1)
  }


  changeToNextFunction(){
    this.nextFunctionList = this.nextFunctionList.filter(e => e.functionName == this.nextFunctionName)[0].functions;
    this.nextFunctionName = ''
    this.nextQueryModelName = ''
  }



  nextFunction(){

    let shouldChange:Boolean = true;

    switch(this.nextFunctionName){
      case 'query':
        this.currentQueryModelName = this.nextQueryModelName;
        this.postActions.push({name:this.nextFunctionName,args:this.tablesProductModels.filter(e => e.tablename == this.currentQueryModelName)[0]})
        break;
      case 'filter':
        const args:FilterCondition = {
          action:this.nextFilterAction,
          leftside:this.currentQueryModelName+"." + this.nextFilterColumnName,
          rightSide:this.nextFilterSchemaColumn
        }
        this.postActions.push({name:this.nextFunctionName,args:args})
        this.reset_filter_data()
        break;

      case 'first' || 'all':
        this.postActions.push({name:this.nextFunctionName})
        this.bigSteps.push(this.postActions)
        this.postActions = []
        this.reset_all_db_function()
        shouldChange = false;
        //

    }
    if(shouldChange){
    this.changeToNextFunction()
    }
  }


  get currentModelProps(){
    const product = this.tablesProductModels.filter(e => e.tablename == this.currentQueryModelName)[0]
    return [...product.columns.map(e => e.name),...product.foreignKeys.map(e => e.column_name)]
  }

  get schemasProps(){

      

    const convertTables:ConvertableTable[] =  this.schemaActiveList.map(e => { 
      
      return {schemaName:e.schemaName,variableName:e.variableName,table:this.tablesProductModels.filter
        (t => 
          e.schemaName.includes(t.tablename))[0] 
          ||
          this.customSchemas.filter(x => e.schemaName.includes(x.targetModel))[0]
      
      }
    
    })

  return convertTableProductModelsToSchemas(convertTables,this.customSchemas,this.tablesProductModels)
  }



  removeSelf(){
    this.deleteOwnView.emit(this.apiClass)
  }



  addReturnObject(){
    this.selectedReturnObjects.push(this.returnModel)
    this.returnModel = ''
  }


  get availableReturnObjects(){
    return this.newObjects.filter(e => this.selectedReturnObjects.filter(x => x == e.tempName)[0] ? false : true)
  }


  buildConditions(){
    this.methodCode = buildAPIFunction("post",this.apiClass.endpointPathUrl,this.apiClass.endpointName,
    this.schemaActiveList.map(e => {
      return {type:`schemas.${e.schemaName}`,variableName:e.variableName}
    }))

    this.returnObjectCode =  createReturnNewObjects(this.selectedReturnObjects)

    this.createObjectsCode = createPostObjects(this.newObjects)

    this.conditionCode = buildConditions(this.bigSteps) 

    this.apiClass.endpointCode = this.wholeCode;
  }

  get wholeCode(){
    return this.methodCode + `  ${this.conditionCode}` + '\n' +  this.createObjectsCode + "\n" + this.returnObjectCode
  }


  createNewObject(){
    this.newObjects.push({schema:this.nextSchemaObject,target:this.nextCreateObject,tempName:this.nextObjectTempName})
    this.nextCreateObject = ''
    this.nextObjectTempName = ''
    this.nextSchemaObject = ''
  }

}

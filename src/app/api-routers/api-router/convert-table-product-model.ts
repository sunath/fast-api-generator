
import CustomSchema from 'src/app/api-schemas/custom-schema-model';
import { TableProductModel } from 'src/app/data/table-product-model';
import { modelClassGenerator } from 'src/app/database-models/model-class-generator';

export interface ConvertableTable {
    variableName:string
    table:TableProductModel
    schemaName:string
}

export const convertTableProductModelsToSchemas = (tables:ConvertableTable[],customSchemas?:CustomSchema[],customTables?:TableProductModel[]) => {

    const x =  tables.map(e => {

        if(!e.table){
            console.log("Not Found Table ... ");
            
            return []
        }
        switch(e.schemaName){
            case e.table.tablename+"Base":
                return getBaseSchemaToUser(e)
            case e.table.tablename+"In":
                return getBaseSchemaToUser(e)
            case e.table.tablename:
                return getModelFullSchema(e)
            default:
                if(customSchemas && customTables)return getCustomSchemaProps(e,customSchemas,customTables)
                return []
                
        }
    })
    
    if(x.length >= 1){
        return x.reduce((e,v) => [...e,...v])
    }else{
        return []
    }
}

export const getBaseSchemaToUser = (convertTable:ConvertableTable) => {
    return [...convertTable.table.columns.filter(e => !e.defaultValue).map(e => `${convertTable.variableName}.${e.name}`), 
    ...convertTable.table.foreignKeys.map(x => `${convertTable.variableName}.${x.column_name}`)
]
}

export const getModelFullSchema = (convertableTable:ConvertableTable) => {
    return [...convertableTable.table.columns.map(e => `${convertableTable.variableName}.${e.name}`),
    ...convertableTable.table.foreignKeys.map(e => e.column_name)
    ,`${convertableTable.variableName}.id`
]
}

export const getCustomSchemaProps = (convertableTable:ConvertableTable,customSchemas:CustomSchema[],customeTables:TableProductModel[]) => {
    const model =   customSchemas.filter(e => e.schemaName == convertableTable.schemaName)[0]
    return [...model.fields]
}
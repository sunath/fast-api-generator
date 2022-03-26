import { DatabaseForeginKey } from './../database-models/database-col-meta';
import TableProductModel from "../data/table-product-model";

export function makeAPISchema(details:TableProductModel[]){

    let data = `from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
`

    for (let table of details){
        let model = `class ${table.tablename}Base(BaseModel):
`

        for(let tableMeataData of table.columns){

            if(!tableMeataData.defaultValue){
                    
                
                model += "    "+tableMeataData.name + ":"+ changeIntoPython(tableMeataData.dtype)+"\n"    

            } 
            if(table.foreignKeys.length >= 1){
                model += generateSchemaForeignkeys(table.foreignKeys);
                model += "\n"
            }   
        }

        data += model

    }


    for (let table of details){
        let model = `class ${table.tablename}In(${table.tablename}Base):
        pass
`

        data += model;

    }

    for(let table of details){
        let model = `class ${table.tablename}(${table.tablename}Base):
    id:int
`

        for(let tableMeataData of table.columns){
            model += "    "+tableMeataData.name + ":"+ changeIntoPython(tableMeataData.dtype)+"\n"
        }

        data += model

        if(table.foreignKeys.length >= 1){
            data += generateSchemaForeignkeys(table.foreignKeys) + "\n"
        }
    }

    return data


}

function changeIntoPython(dtype:string){
    switch(dtype){
        case "String":
            return 'str'
        case "Integer":
            return 'int'
        case "Boolean":
            return 'bool'
        case 'Float':
            return 'float'
        case 'DateTime':
            return 'datetime'
        default:
            return 'str'
    }
}


const generateSchemaForeignkeys = (keys:DatabaseForeginKey[],tabs=1) => keys.map(e => new Array(tabs*4).fill(" ").reduce((e,v) => e+v) +e.column_name+":int").reduce((e,v) => e+"\n"+v)
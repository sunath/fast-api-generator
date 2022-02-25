import TableProductModel from "../data/table-product-model";

export function makeAPISchema(details:TableProductModel[]){

    let data = `from typing import List, Optional
from pydantic import BaseModel

`

    for (let table of details){
        let model = `class ${table.tablename}Base(BaseModel):
`

        for(let tableMeataData of table.columns){
            model += "   "+tableMeataData.name + ":"+ changeIntoPython(tableMeataData.dtype)+"\n"
        }

        data += model

    }

    for(let table of details){
        let model = `class ${table.tablename}(${table.tablename}Base):
    id:int
`

        for(let tableMeataData of table.columns){
            model += "    "+tableMeataData.name + ":"+ changeIntoPython(tableMeataData.dtype)+"\n"
        }

        data += model
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
        default:
            return 'str'
    }
}
import  TableProductModel  from 'src/app/data/table-product-model';
import { GetEndpointFunction } from './../api-router-custom/api-custom-def';
import { IApiGetFunctionStep } from './get_depend_func-model';


export interface IApiGetQueryParam{
    
        name:string
        type:string
    
}

export const generateGetFunction = (queryParms:IApiGetQueryParam[],apiClass:GetEndpointFunction) => {
    let result = ''
    if(apiClass.endpointTargetModel){
        result += 
`@api_router.get('${apiClass.endpointPathUrl}')
`
    }

    if(queryParms.length >= 1){
    result+= 
`def ${apiClass.endpointName}(`+extractQueryParms(queryParms)+`):`
    }else{
        result +=
`def ${apiClass.endpointName}():`
    }

    return result;
}



const extractQueryParms = (queryPrams:IApiGetQueryParam[]) => {
    console.log(queryPrams);
    
    return queryPrams.map((e,i) =>   `${e.name}: ${e.type} ${i < queryPrams.length -1 ? ',' : ''}` ).reduce((e,v) => e+v)
}

export const buildFullGetDefVersion = (currentBuildVersion:string,steps:IApiGetFunctionStep[],modelName:string,bigSteps?:IApiGetFunctionStep[][]) => {
    let newResult = currentBuildVersion;
    if (!bigSteps){
    return newResult+ `
    return db` + steps.map((e) => convertIntoPythonString(e,modelName)).reduce((e,v) => e+v)

    }


    return newResult+`
    return db` + bigSteps.map((e,i) => e.map((x) => convertIntoPythonString(x,modelName)).reduce((p,v) => p+v)).map((e,i) => {
        return e
    }).reduce((p,v) => p+v)
}


const convertIntoPythonString =  (e:IApiGetFunctionStep,modelName?:string) => {
    switch(e.name){
        case 'query':
            const args:TableProductModel = e.args;
            if(args){
                return `.query(${args.tablename})`
            }
            return `.query()`
        case 'filter':
            const filterArgs = e.args;
            if(filterArgs){
                return `.filter(models.${modelName}.${filterArgs.leftSide.name || filterArgs.leftSide.column_name} ${filterArgs.compareBy} ${filterArgs.rightSide.name} )`
            }
            return `.filter()`

        case 'first':
            return `.first()`
        case 'all':
            return '.all()'
        default:
            return ``
    } 
}
import { TableProductModel } from 'src/app/data/table-product-model';
import { IApiFunctionStep } from './depend_function_model';



export interface FilterCondition{
    action:string,
    leftside:string
    rightSide:string
}


export const buildConditions = (steps:IApiFunctionStep[][]) => {
   return  `if `+steps.map(e => {
       return `db`+ e.map(x => {
            switch(x.name){
                case 'query':
                    const table:TableProductModel = x.args
                    return `.query(models.${table.tablename})`
                case 'filter':
                    const args:FilterCondition = x.args;
                    return `.filter(mdels.${args.leftside}${args.action}${args.rightSide})`
                case 'first':
                    return `.first()`
                case 'all':
                    return '.all()'

                default:
                    return ``
            }
        }).reduce((e,i) => e+i)
    }).map((v,i) =>  i == steps.length-1 ? v + " :" : `${v} or ` ).reduce((p,n) => p+n) + `
        raise HTTPException(status_code=403,details="Please make sure you have entered correct data ")`
}
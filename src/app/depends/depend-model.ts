

import { filter } from 'rxjs';
import TableProductModel  from 'src/app/data/table-product-model';



export class AppDependModel{
    constructor(public dependName:string,public dependVariableName:string,public functions:AppFunction[] = []){}    
}


export class AppFunction{
    
    constructor(public functionName:string,public functionArgs:IAppFunctionArgs,public functions:AppFunction[] = []){}
}

export interface IAppFunctionArgs{
    haveArgs:boolean
    args?:any
}


const defaultArgs:IAppFunctionArgs = {
    haveArgs:false
}



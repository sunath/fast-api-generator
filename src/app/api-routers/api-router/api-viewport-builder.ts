
export interface IApiArgument {
    variableName:string
    type:string
}

export const buildAPIFunction = (view:string,path:string,def_name:string,prams:IApiArgument[]) => {return `
@api_router.${view}("${path}")
def ${def_name}(${buildArgumentToString(prams)}):
`
}


export const buildArgumentToString = (parms:IApiArgument[]) => {
    console.log(parms);
    
    return parms.map( e => `${e.variableName}:${e.type} , `)
    .reduce((p,n) => p+n) + 'db = Depends(get_db)'
}
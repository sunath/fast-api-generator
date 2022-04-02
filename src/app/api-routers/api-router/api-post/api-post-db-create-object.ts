export interface IDbCreateObject{
    tempName:string
    target:string
    schema:string
}


export const createPostObjects = (objects:IDbCreateObject[]) => {
    return objects.map(e => 
`   ${e.tempName} = models.${e.target}(**${e.schema}.dict())
    db.add(${e.tempName})`
    ).reduce
    ((p,n) => p + "\n" +n)  + " \n  db.commit()" 
}


export const createReturnNewObject = (objectName:string) => {
    return `
    db.refresh(${objectName})
    return ${objectName}`
}

export  interface DbTypeMetaData{
    dbName:string
    dbRequiredAuth:boolean
    dbUrl?:string
    dbUsername?:string
    dbPassword?:string,
    projectDataBaseName?:string
}

export const DatabaseTypes:DbTypeMetaData[] = [
    {
        dbName:"sqlite",
        dbRequiredAuth:false
    },
    {
        dbName:"postgresql",
        dbRequiredAuth:true
    },
    {
        dbName:"mySQL",
        dbRequiredAuth:true
    }
]
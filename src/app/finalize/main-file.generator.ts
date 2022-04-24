import { TabelServiceCode } from "../api-routers/service-generator";



export function createMainFile(routes:TabelServiceCode[]){
    const init = `from fastapi import FastAPI
from database import engine
from models import Base

#route Imports
${importRoutes(routes)}

Base.metadata.create_all(bind=engine)

app = FastAPI()


${addRoutes(routes)}
    `

    let code = init
    return code
}


const importRoutes = (routes:TabelServiceCode[]) => {
    let code = ``
    for(let route of routes){
        code+=`
import ${route.tablename.toLowerCase()}_service`
    }
    return code
}

const addRoutes = (routes:TabelServiceCode[]) => {
    let code = ``

    for(let route of routes){
        code += `
app.include_router(${route.tablename.toLowerCase()}_service.api_router)
`
    }

    return code
}
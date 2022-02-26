import { DatabaseTypes } from "../data/db-list";
import { DatabaseConfiguraion } from "./db-config.actions";



export function createDatabaseCode(info:DatabaseConfiguraion){

   const databaseMetaDeta =  DatabaseTypes.filter(e => info.db_type== e.dbName)[0]

   

   if(!databaseMetaDeta.dbRequiredAuth){
    return `    from sqlalchemy import create_engine

    from sqlalchemy.ext.declarative import declarative_base

    from sqlalchemy.orm import sessionmaker
    
    SQLALCHEMY_DATABASE_URL = "sqlite:///./${info.db_name}.db"
    
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    Base = declarative_base()

    def get_db():
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()
    `

   }else{

   return  `    from sqlalchemy import create_engine
    from sqlalchemy.ext.declarative import declarative_base
    from sqlalchemy.orm import sessionmaker
    
    #SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
    SQLALCHEMY_DATABASE_URL = "postgresql://${info.db_username}:${info.db_password}@${info.db_server_url}/${info.db_name}"
    
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    Base = declarative_base()

    def get_db():
        db = SessinLocal()
        try:
            yield db
        finally:
            db.close()


    `
   }
    

}
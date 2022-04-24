import { createAction, props } from "@ngrx/store";


export interface DatabaseConfiguraion{
    isSetup:boolean
    db_name?:string
    db_type?:string
    project_name?:string
    db_server_url?:string
    db_username?:string
    db_password?:string,
    file_text?:string
}


export const database_setup_action = createAction("[DatabaseConfigComponent] setup",props<{details:DatabaseConfiguraion}>())
export const database_update_file = createAction("[DatabaseConfigComponent] update file",props<{text:string}>())

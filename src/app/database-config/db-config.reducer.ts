import { createReducer,on } from "@ngrx/store";
import { DatabaseConfiguraion, database_setup_action, database_update_file } from "./db-config.actions";

const initState:DatabaseConfiguraion = {
    isSetup:false
}

const _db_config_reducer = createReducer(initState,
    on(database_setup_action,(state,{details}) => ({...details})),
    on(database_update_file,(state,{text}) => ({...state,file_text:text}))
    )

export function dbConfigReducer(action:any,state:any) {
    return _db_config_reducer(action,state)
}
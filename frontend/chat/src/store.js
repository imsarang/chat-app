import userReducer from "./components/redux/userReducer";
import clickReducer from "./components/redux/clickReducer";
import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persisReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig1 = {
    key:'click',storage
}
const persistConfig2 = {
    key:'user',storage
}

const persistClick = persistReducer(persistConfig1,clickReducer)
const persistUser = persistReducer(persistConfig2,userReducer)

const store = configureStore({
    reducer:{
        click:persistClick,
        user:persistUser,
    },
    
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const persistor = persistStore(store)   
export default store
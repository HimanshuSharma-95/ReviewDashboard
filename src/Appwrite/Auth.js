import conf from "../Conf/Conf";
import {Client,Account} from "appwrite"

export class Authservice {

    client = new Client()
    account;

    constructor(){

        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
      
    }

    async createAccount({name,email,password,id}){

        try{

         
            const useraccount = await this.account.create(
            id,
            email,
            password,name)

            if(useraccount){

                // auto login
                return this.login({email,password})
                
            }
            else{

                return useraccount
                
            }

        }
        catch(error){
            throw error
        }


    }




    async login(email,password){

        try{

            return await this.account.createEmailPasswordSession(email,password)

        }
        catch(error){
            throw error
        }


    }


    async logout(){

        try{
            return await this.account.deleteSessions()
        } catch(error){
            throw error
        }
    }
    
    

    async getcurrentuser(){
        
        try{
            return await this.account.get()
        }
        catch(error){
          
            console.log("currently logged out")
            return false
        }


    }



}

const authservice = new Authservice()


export default authservice


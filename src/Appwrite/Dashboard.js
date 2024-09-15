
import { Databases, Query } from "appwrite";
import { Client } from 'appwrite';
import conf from "../Conf/Conf";

export class DashboardService{

    client = new Client();
    databases;

    constructor(){

  this.client
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId)

  this.databases = new Databases(this.client);

    }


    async GetReviews(id){

        try{

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
               [
                Query.equal("Ownerid",id)
                
               ]
            )

        }catch(error){

            console.log("Appwrite serive :: getPost :: error", error);
            return false

        }

    }



    async DeleteReview(id){

      try{ return await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            id
        )
      }catch(error){
       console.log(error)
        return false
      }




    }



}

const Dashboardservice = new DashboardService()
export default Dashboardservice
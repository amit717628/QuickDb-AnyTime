// ADD THESE ON YOUR CLIENT SIDE TO MAKE REQUEST EASILY // 

const axios = require(`axios`);

class QuickAnytime{
    constructor(token,url){
        this.token = token
        this.url = url
    }

     async getData(query){
        if(!this.token) throw new Error("No Token Provided")
       if(!query){
        throw new Error("You must have to pass query")
       }
       
       if(query){
        const options = {
            method: 'GET',
            url: `${this.url}/api/getdata/${query}`,
            headers: { "auth": `${this.token}` },
         }
         const data = await axios.request(options);
         const result = await data.data;
         return result
       }
    }

    // Create Data //

    async createData(query,value){
        if(!this.token) throw new Error("No Token Provided")
        if(!query){
         throw new Error("You must have to pass query")
        }
        if(!value){
            throw new Error("You must have to pass value")
           }
    
           if(query){
            const options = {
                method: 'POST',
                url: `${this.url}/api/createdata`,
                headers: { "auth": `${this.token}` },
                data: {
                    provider: query,
                    value: value
                }
             }
             const data = await axios.request(options);
             const result = await data.data;
             return result
           }
    }



    async deleteData(query){
        if(!this.token) throw new Error("No Token Provided")
        if(!query){
         throw new Error("You must have to pass query")
        }

        if(query){
            const options = {
                method: 'DELETE',
                url: `${this.url}/api/delete/${query}`,
                headers: { "auth": `${this.token}` },
             }
             const data = await axios.request(options);
             const result = await data.data;
             return result
        }
    }
}


module.exports = QuickAnytime



// EXAMPLE //
/*
const QuickAnytime = require(`./index`);

const database = new QuickAnytime('YOUR TOKEN','SERVER API URL')

const get = database.getData('hmm').then(x => console.log(x))
*/


// Developed By Aayan
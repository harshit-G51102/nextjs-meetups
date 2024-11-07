import { MongoClient } from "mongodb";



async function handler(req,res){
    if(req.method==='POST'){
        const data=req.body;
        const client= await MongoClient.connect("mongodb+srv://harshitgangwar51102:QXgsDoFsK0Ds21qL@cluster0.zw2dp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        const db=client.db();
        const meetupsCollection=db.collection('meetups');
        const result=await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message:'meetup inserted'});
    }
}

export default handler;
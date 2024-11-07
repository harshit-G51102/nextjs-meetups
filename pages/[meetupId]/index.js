import { MongoClient,ObjectId } from "mongodb";
import Meetupdetail from "../../components/meetups/Meetupdetail";
import dotenv from "dotenv";
import Head from "next/head";

dotenv.config();

function MeetupDetails(props){
    return <>
        <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
        </Head>
        <Meetupdetail image={props.meetupData.image} title={props.meetupData.itle} address={props.meetupData.address} description={props.meetupData.description} ></Meetupdetail>
    </>
}

export async function getStaticPaths(){
    const client= await MongoClient.connect('mongodb+srv://harshitgangwar51102:QXgsDoFsK0Ds21qL@cluster0.zw2dp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    const db=client.db();
    const meetupsCollection=db.collection('meetups');
    const meetups=await meetupsCollection.find({},{_id:1}).toArray();
    client.close();
    return {
        fallback:false,
        paths:meetups.map(meetup=>({params:{meetupId:meetup._id.toString()}}))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect("mongodb+srv://harshitgangwar51102:QXgsDoFsK0Ds21qL@cluster0.zw2dp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
    client.close();
    return {
        props: {
            meetupData: {
                id: meetups._id.toString(),
                title: meetups.title,
                address: meetups.address,
                image: meetups.image,
                description: meetups.description,
            },
        },
    };
}


export default MeetupDetails;
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

function HomePage(props){
    return <>
    <Head>
        <title>React Meetups</title>
        <meta name="description" content="browse a huge list of highly active react meetups"></meta>
    </Head>
    <MeetupList meetups={props.meetups} />
    </>
        
    
}

export async function getStaticProps() {
    const client= await MongoClient.connect("mongodb+srv://harshitgangwar51102:QXgsDoFsK0Ds21qL@cluster0.zw2dp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    const db=client.db();
    const meetupsCollection=db.collection('meetups');
    const meetups=await meetupsCollection.find().toArray();
    client.close();
    return{
        props:{
            meetups:meetups.map(meetup=>({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                description:meetup.description,
                id:meetup._id.toString()
            }))
        },
        revalidate:1
    }
}


export default HomePage;
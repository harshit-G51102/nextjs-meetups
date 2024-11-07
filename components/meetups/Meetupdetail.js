import classes from './Meetupdetail.module.css';


function Meetupdetail (props) {
    return <section className={classes.detail}>
    <img src={props.image}></img>
    <h1>{props.title}</h1>
    <address>{props.address}</address>
    <p>{props.description}</p>
</section>
}

export default Meetupdetail;
import "./index.css"
const Card = ({imagePath,imagePath2x,tags,title,autor,date,views,text,onClick}) =>{
    return (
        <div className="card-container" onClick={onClick}>
            <img src={imagePath} srcSet={imagePath2x}  alt="Post"></img>
            <p className="tags">{tags}</p>
            <p className="title">{title}</p>
            <p className="autor"> {autor} <span> • {date} </span> <span> • {views}</span> </p> 
            <p className="text">{text}</p>
        </div>
    )
}

export default Card
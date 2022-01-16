import { FaStar } from "react-icons/fa"; 
import style from "../components/star.module.css";

const Details = ({ details,bookslist,setbookslist}) => {
    const updateNote = (e)=>{
        let temp = [...bookslist];
        for (let index = 0; index < temp.length; index++) {
            if(temp[index].ID ===details.ID){
                temp[index].Nots = e.target.value;
                setbookslist(temp);
                break;
            }
        }
    }
    
  return (
    <div>
      {
      [...Array(5)].map((star, i) => {
        const ratingValue = i ;
        return (
          <label key={i}>
            <FaStar
              className={style.star}
              color={ratingValue < details.Rating ? "#ffc107" : "#e4e5e9"}
              size={100}
            />
          </label>
        );
      })
      }
      <p>Title: {details.Title}</p>
      <img
        src={details.imgUrl}
        alt="reading book"
        title={details.Title + " By " + details.Author}
      />
      <p>Author: {details.Author}</p>
      <article>Description : {details.Plotsummary}</article>
      
      <p>Nots:</p>
      <textarea  onChange={updateNote} cols="200" defaultValue={details.Nots? details.Nots : "" } rows="10" />

    </div>
  );
};
export default Details;

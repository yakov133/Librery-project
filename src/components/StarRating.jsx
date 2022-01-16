import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styleStar from "./star.module.css";

const StarRating = ({bookslist,setbookslist,ID}) => {
  const [rating, setrating] = useState(null);
  const [hover, sethover] = useState(null);


  const changeRating= (ratingValue,ID)=>{
    let temp = [...bookslist];
    for (let index = 0; index < temp.length; index++) {
        if(temp[index].ID===ID){
            temp[index].Rating= ratingValue;
            setbookslist(temp);
            break;
        }
    }
}

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
            className={styleStar.inputStar}
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setrating(ratingValue)}
            />

            <FaStar
              className={styleStar.star}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={100}
              onMouseEnter={()=>{
                  sethover(ratingValue);
                  changeRating(ratingValue,ID)
                }}
              onMouseLeave={()=>sethover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};
export default StarRating;

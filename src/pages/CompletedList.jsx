import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import StarRating from "../components/StarRating";
import style from "./CSS/booksList.module.css"
import { RiDeleteBin2Fill } from "react-icons/ri";  
import { RiArrowGoBackFill } from "react-icons/ri";

const CompletedList = ({bookslist,setbookslist,readinglist,setreadinglist,completedlist,setcompletedlist,setdetails})=>{
    const [array, setarray] = useState([]);
    const [flage, setflage] = useState(false);
    
    const copeyAndUpdate =()=>{
        let temp = bookslist.filter((book)=>{
            if(completedlist.includes(book.ID))
                return book;
        })
        setarray(temp);
    } 

// // todo V.1
//     useEffect(()=>{
//         copeyAndUpdate();
//     },[],[completedlist])

// // todo V.2
    useEffect(()=>{
        copeyAndUpdate();
    },[])
    
    useEffect(()=>{
        copeyAndUpdate();
    },[completedlist])


    if(flage){
        return <Redirect to={"/Details"}/>
    }
    const changeFlag = (ID)=>{
        let temp = [...bookslist];
        for (let index = 0; index < temp.length; index++) {
            if(temp[index].ID===ID){
                temp[index].flagPlus=!temp[index].flagPlus;
                setbookslist(temp);
            }    
        }
    }
    const Details =(ID)=>{
        for (let index = 0; index < bookslist.length; index++) {
            if(bookslist[index].ID===ID){
                setdetails(bookslist[index]);
                break;
            }
        }
        setflage(true)
    }
    const MoveToReadindList= (ID)=>{
        let temp = [...completedlist];
        for (let index = 0; index < temp.length; index++) {
            console.log(temp[index]);
            if(temp[index] === ID){
                temp.splice(index,1);
                setcompletedlist(temp);
                break;
            }
        }
        let exist = false;
        temp = [...readinglist];
        for (let index = 0; index < temp.length; index++) {
            if(temp[index]===ID){
                exist=true;
                break;
            }
        }
        if(!exist){
            temp.push(ID);
            setreadinglist(temp);
            temp = [...bookslist];
            for (let index = 0; index < temp.length; index++) {
                if(temp[index].ID === ID ){
                    temp[index].flagPlus = true
                    setbookslist(temp);
                    break;
                }
            }
        }
    }
    const RemoveFromCompleted = (ID)=>{
        let temp = [...completedlist];
        for (let index = 0; index < temp.length; index++) {
            if(temp[index] === ID){
                temp.splice(index,1);
                setcompletedlist(temp);
                break;
            }
        }
        temp = [...bookslist];
        for (let index = 0; index < temp.length; index++) {
            if(temp[index].ID === ID ){
                temp[index].flagPlus = false;
                temp[index].Rating = 0;
                setbookslist(temp);
                break;
            }
        }
    }
    

    return(
        <div>
            <h1>Completed List</h1>
            <div>
            {array.map((book,i)=>{return <div key={i} className={style.borderDiv}>
                    <div>
                        <StarRating bookslist={bookslist} setbookslist={setbookslist} ID={book.ID}/>
                        <button className={style.copmlet} onClick={()=>MoveToReadindList(book.ID)} title="Mark has Unread"><RiArrowGoBackFill/></button>
                        <button className={style.delete} onClick={()=>RemoveFromCompleted(book.ID)}><RiDeleteBin2Fill/></button>
                    </div>
                        <div onClick={()=>Details(book.ID)} title="More Details">
                        <p>Title: {book.Title}</p>
                        <img className={style.img_Booklist} src={book.imgUrl} alt="reading book" title={book.Title+ " By " + book.Author} />
                        <p>Author: {book.Author}</p>
                        <p>Description : {book.Plotsummary.slice(0,150)+<br/>+book.Plotsummary.slice(150,600)+"...."}</p>
                        </div>
                    </div>})
                }
            </div>
        </div>)}
export default CompletedList;

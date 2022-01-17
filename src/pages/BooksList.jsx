import style from "./CSS/booksList.module.css"
import { FcLike,FcDislike,FcCheckmark } from "react-icons/fc";
import { useEffect,useState } from "react"

const BooksList = ({bookslist,setbookslist,readinglist,setreadinglist,completedlist,setcompletedlist})=>{

    const [array, setarray] = useState([]);

    useEffect(()=>{
        let temp = [...bookslist];
        temp = temp.slice(0,10);
        setarray(temp);
    },[])
    useEffect(()=>{
        let temp = [...bookslist];
        temp = temp.slice(0,10);
        setarray(temp);
    },[bookslist])

const changeFlag = (ID)=>{
    let temp = [...bookslist];
    for (let index = 0; index < temp.length; index++) {
        if(temp[index].ID===ID){
            temp[index].flagPlus=!temp[index].flagPlus;
            setbookslist(temp);
        }    
    }
}

const addTOReadingList = (ID,i)=>{
    let temp = [...readinglist];
    let exist = false;
    for (let index = 0; index < temp.length; index++) {
        if(temp[index]===ID){
            exist = true;
            break
        }
    }
    if(!exist){
    temp.push(ID);
    setreadinglist(temp);
    changeFlag(ID)
    }

}

const removeFromReadingList = (ID,i)=>{
    let temp = [...readinglist];
    let found = false;
    for (let index = 0; index < temp.length; index++) {
        if(temp[index]===ID){
            temp.splice(index,1);
            setreadinglist(temp);
            found = true;
            break;
        }
    }
    if(found){
        changeFlag(ID)
    }
    
}

const MoveToComplited = (ID)=>{
    let temp = [...readinglist];
    let found = false;
    for (let index = 0; index < temp.length; index++) {
        if(temp[index]===ID){
            temp.splice(index,1);
            setreadinglist(temp);
            found = true;
            break;
        }
    }
    if(found){
        temp = [...completedlist];
        let exist = false;
        for (let index = 0; index < temp.length; index++) {
            if(temp[index]===ID){
                exist = true;
                break
            }
        }
        if(!exist){
        temp.push(ID);
        setcompletedlist(temp);
        }

    }
}
const SearchFristTen =(e)=>{
    const text = e.target.value;
    let temp=[];
    for (let index = 0; index < bookslist.length; index++) {
        const book = bookslist[index];

        if(book.Title.toLowerCase().includes(text)||book.Author.toLowerCase().includes(text)||book.Plotsummary.toLowerCase().includes(text)){
            temp.push(book);
            if(temp.length===10){
                break;
            }
        }
    }
    console.log(temp);
    setarray(temp);
}

    return(
        <div>
            <h1>Books List</h1>
            <div >
            <input type="text" onChange={SearchFristTen} placeholder="...Search" />
                <div>
                {array.length?array.map((book,i)=>{return <div key={i} className={style.borderDiv}>
                    {array[i].flagPlus?<div>
                        <button className={style.btn_Booklist} onClick={()=>MoveToComplited(book.ID)} title="Mark has read"><FcCheckmark/></button>
                        <button className={style.btn_Booklist} onClick={()=>removeFromReadingList(book.ID,i)} title="Remove From List"><FcDislike/></button>
                    </div>:<button className={style.btn_Booklist} onClick={()=>addTOReadingList(book.ID,i)} title="Add To Reading List"><FcLike/></button>}
                        <p>Title: {book.Title}</p>
                        <img className={style.img_Booklist} src={book.imgUrl} alt="reading book" title={book.Title+ " By " + book.Author} />
                        <p>Author: {book.Author}</p>
                        <p>Description : {book.Plotsummary.slice(0,150)+<br/>+book.Plotsummary.slice(150,600)+"...."}</p>
                    </div>})
                :
                <p>Nothing Was Found</p>
                }
                <div>
                    
                </div>
                </div>
            </div>

        </div>)
}
export default BooksList;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import { useState, useEffect } from "react";
import * as BookAPI from './BooksAPI';
import SearchPage from "./Components/Search";
function App() {
    const [allBooks, setAllBooks] = useState([]);
 
  
  // flag to get false if update shelf is done
  let [flag, setFlag] = useState(true)

  // to return all books in getAll API
  useEffect (() =>{
    const getBooks = async () => {
      const res = await BookAPI.getAll();
      setAllBooks(res);
    };
    getBooks();
  }, []);

  // to return books with updated shelf
  useEffect(()=>{
    if(flag === false){
      const getUpdatedBooks = async () => {
        const res = await BookAPI.getAll();
        setAllBooks(res);
      };
      getUpdatedBooks();
    }
    return () => {
      flag = true
      setFlag(flag)
    }
    
  },[!flag])

 // to change shelf in books
  const handleChangeShelf = (book,e) =>{
    let bookOne = allBooks.filter(b=>b.id === book.id)
    bookOne.shelf = e;
    BookAPI.update(book,bookOne.shelf);
    flag= false
    setFlag(flag)
    
  }
  return (
    <div className="app">
      <BrowserRouter>
         <Routes>
            <Route 
               exact path='/' element={<Home books ={allBooks} onChangeShelf={handleChangeShelf}/>}
            />
            <Route 
               exact path='/search' element={<SearchPage books ={allBooks} onChangeShelf={handleChangeShelf}/>}
            />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

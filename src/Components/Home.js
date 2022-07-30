import { useState, useEffect } from "react";
import * as BookAPI from '../BooksAPI';
import AllBooks from "./AllBooks";
import SearchPage from "./Search";
function Home() {
  const [showSearchPage, setShowSearchpage] = useState(false);
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
    
      {showSearchPage ? (
        <SearchPage 
          showSearchPage={showSearchPage} 
          setShowSearchpage= {setShowSearchpage}
          books = {allBooks}
          onChangeShelf = {handleChangeShelf}
          setBook = {setAllBooks}
           />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <AllBooks 
                      books = {allBooks.filter(b=>b.shelf === "currentlyReading")} 
                      onChangeShelf = {handleChangeShelf}
                      />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <AllBooks 
                    books = {allBooks.filter(b=>b.shelf === "wantToRead")} 
                    onChangeShelf = {handleChangeShelf}
                    />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title"> Read</h2>
                <div className="bookshelf-books">
                  <AllBooks 
                    books = {allBooks.filter(b=>b.shelf === "read")} 
                    onChangeShelf = {handleChangeShelf}
                    />
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

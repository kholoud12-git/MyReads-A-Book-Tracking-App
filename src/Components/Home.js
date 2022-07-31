import AllBooks from "./AllBooks";
import {Link} from 'react-router-dom'
const Home =({books,onChangeShelf})=> {

  return (
    <div className="app">
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
                      books = {books.filter(b=>b.shelf === "currentlyReading")} 
                      onChangeShelfs = {onChangeShelf}                     
                    />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <AllBooks 
                    books = {books.filter(b=>b.shelf === "wantToRead")} 
                    onChangeShelfs = {onChangeShelf}                    
                    />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title"> Read</h2>
                <div className="bookshelf-books">
                  <AllBooks 
                    books = {books.filter(b=>b.shelf === "read")} 
                    onChangeShelfs = {onChangeShelf}
                    />
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>
    </div>
  );
}

export default Home;

const AllBooks = ({books, onChangeShelf})=> {
    return ( <div>
      <ol className="books-grid">
        {books.map((book)=>(
          <li key={book.id}>
            <div className="book">  
              <div className="book-top">
                {book.imageLinks ?(<div
                  className="book-cover"
                  style={{
                     width: 128,
                     height: 193,
                     backgroundImage:`url(${book.imageLinks.thumbnail})`
                   }}
               >
               </div>) : (<div
                  className="book-cover"
                  style={{
                     width: 128,
                     height: 193
                   }}
               >
               </div>)
                }
                <div className="book-shelf-changer">
                  <select  onChange={(e)=>onChangeShelf(book, e.target.value)}>
                    <option disabled>
                      Move to...
                    </option>
                    
                    {book.shelf == 'none' ?
                    (<option value="none" selected><span>&#10003;</span>None</option>):
                    (<option value="none" >None</option>)
                    }
                    {book.shelf == 'currentlyReading' ?
                    (<option value="currentlyReading" selected><span>&#10003;</span>Currently Reading</option>):
                    (<option value="currentlyReading" >Currently Reading</option>)
                    }
                    {book.shelf == 'wantToRead' ?
                    (<option value="wantToRead" selected><span>&#10003;</span>Want to Read</option>):
                    (<option value="wantToRead" >Want to Read</option>)
                    }
                    {book.shelf == 'read' ?
                    (<option value="read" selected><span>&#10003;</span>Read</option>):
                    (<option value="read" >Read</option>)
                    }
                      
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
          ))
        }
      </ol>
      </div>
    );
    
}

export default AllBooks;


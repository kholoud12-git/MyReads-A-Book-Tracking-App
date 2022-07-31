
const AllBooks = ({books, onChangeShelfs})=> {
  const shelfs=[
    {name: 'Currently Reading',title:'currentlyReading'},
    {name: 'Want To Reading',title:'wantToRead'},
    {name: 'Read',title:'read'}]
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
                   <select value={book.shelf} onChange={(e)=> onChangeShelfs(book,e.target.value)}>
                     <option disabled>
                       Move to...
                     </option>
                     {shelfs.map(op => 
                       (<option value={op.title} key={op.title}>{op.name}</option>)
                     )}
                     <option value={'none'} >None</option>
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


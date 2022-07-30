import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import * as BookAPI from '../BooksAPI';
import { useEffect } from 'react';
const SearchPage =({showSearchPage, setShowSearchpage,onChangeShelf,books}) => {
  
  const [query, setQuery] = useState("");
  const [bookList, setBookList] = useState([])
  const [debouncedText] = useDebounce(query, 500);
  const shelfs=[
    {name: 'Currently Reading',title:'currentlyReading'},
    {name: 'Want To Reading',title:'wantToRead'},
    {name: 'Read',title:'read'}]
  const numRes = 20;
  useEffect(()=>{
    if(debouncedText){
      const getSearchResult = async () => {
        const res =await BookAPI.search(debouncedText,numRes)
        setBookList(res);
      }
      getSearchResult();
    } else {
      setBookList([])
    };
    return () => setBookList([])
  },[debouncedText])

    return ( <div>
  <div className="search-books">
    <div className="search-books-bar">
      <a
        className="close-search"
        onClick={() => setShowSearchpage(!showSearchPage)}
      >
        Close
      </a>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          value = {query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
    <div className="search-books-results">
      {bookList && bookList.length? 
      (<ol className="books-grid">
        {bookList.map((book)=>
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
                   <select  onChange={(e)=> onChangeShelf(book,e.target.value)}>
                     <option disabled>
                       Move to...
                     </option>
                     {shelfs.map(op => {
                      if(books.some(b=>b.shelf === op.title)){
                        return (<option value={op.title} key={op.name}>{op.name}</option>)
                      }
                     })}
                     { // to get bookShelf for book in search page
                      books.map((b)=>{
                         if(b.id === book.id){
                           return (<option value='none' key='none'>None</option>)
                         }
                        })}
                   </select>
                 </div>
               </div>
               <div  className="book-title" >{book.title}</div>
               <div className="book-authors">{book.authors}</div>
              { // to get bookShelf for book in search page
                 books.map((b)=>{
                  if(b.id === book.id){
                   return <div className="book-title" key={b.id}>{b.shelf}</div>
                  }
                 })
              }
             </div>
           </li>
        )}
      </ol>) : (
        <p className='notFound'>
          No Books Found
        </p>
       )

      }
      <ol className="books-grid">
      </ol>
    </div>
  </div>
</div>);
}

export default SearchPage;
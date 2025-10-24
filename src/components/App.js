
import React, { useEffect, useState } from "react";
import './../styles/App.css';
import {useDispatch, useSelector} from 'react-redux'
import { fetchApi } from "../redux/bookSlice";
import { sortBooks,setSortCriteria,setSortOrder } from "../redux/bookSlice";
const App = () => {
const {books,loading,error} = useSelector((state)=>state.books);
const dispatch = useDispatch();

console.log(books);

useEffect(()=>{
  dispatch(fetchApi());
},[])



  return (
    <div>
  
      <select onChange={(e)=>{dispatch(setSortCriteria(e.target.value))}}>
        <option value={'title'}>Title</option>
        <option value={'author'}>Author</option>
        <option value={'publisher'}>Publisher</option>
      </select>
        <select onChange={(e)=>{dispatch(setSortOrder(e.target.value))}}>
        <option value={'asc'}>Ascending</option>
        <option value={'desc'}>descending</option>
      </select>
        <table style={{border:'1px solid black',borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{border:'1px solid black'}} >
            <th>Title</th>
            <th>Author</th>
            <th>publisher</th>
            <th>Price</th>
            </tr>
          </thead>
          <tbody>
            { books.map((book,index)=>(
                 <tr key={index} style={{border:'1px solid black',borderCollapse: 'collapse'}}>
                   <td style={{border:'1px solid black',borderCollapse: 'collapse' }}>{book?.title}</td>
                   <td style={{border:'1px solid black',borderCollapse: 'collapse'}}>{book?.author}</td>
                   <td style={{border:'1px solid black',borderCollapse: 'collapse'}}>{book?.publisher}</td>
                   <td style={{border:'1px solid black',borderCollapse: 'collapse'}}>{book?.price}</td>
                 </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default App

import React,{useState} from 'react'
import './header.css';


const Header = () => {
  const [search,setSearch]=useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
    window.location.replace(`/?cat=${search}`);

  }
  
  return (
    <div className='header' id='header'>
        <form className='search' onSubmit={handleSubmit}>
           {/* <img src="assets/food1.jpg" alt=""  className="header-img" />*/}
           <input type="text" className='searchBox' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search by category" />
           <i className="searchIcon fa fa-search fa-lg"></i>

          
        </form>
    </div>
  )
}

export default Header
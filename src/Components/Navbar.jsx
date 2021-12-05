import React,{useContext,useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import { UserContext } from '../App'
const Navbar = () => {
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const[show,setShow] =useState(false)
  const renderList = ()=>{
    if(state)
    {
       return [

         <li><Link to="/profile">Profile</Link></li>,
         <li><Link to="/createpost">Create Post</Link></li>,
         <li><Link to="/myfollowerspost">My Following post</Link></li>,
         
         <li>
           <button className="btn #c62828 red darken-3"
           onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
           }}>
             Logout
           </button>
         </li>
         
       ]
    } else{
      return [
        <li><Link to="/signin">Login</Link></li>,
        <li><Link to="/signup">SignUp</Link></li>
      ]
    }
  }
    return (
  // <>
  //  <div className="toggle__menu">
  //           <svg onClick={() => setShow(!show)}
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="16"
  //             height="16"
  //             fill="currentColor"
  //             class="bi bi-justify white pointer"
  //             viewBox="0 0 16 16"
  //           >
  //             <path
  //               fill-rule="evenodd"
  //               d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
  //             />
  //           </svg>
  //         </div>
  //         {
  //           show ?(
  //         <ul className="sidebar d__flex">
  //         <li><Link to="/profile">Profile</Link></li>
  //        <li><Link to="/createpost">Create Post</Link></li>
  //        <li><Link to="/myfollowerspost">My Following post</Link></li>
         
  //        <li>
  //          <button className="btn #c62828 red darken-3"
  //          onClick={()=>{
  //             localStorage.clear()
  //             dispatch({type:"CLEAR"})
  //             history.push('/signin')
  //          }}>
  //            Logout
  //          </button>
  //        </li>
  //        </ul>
  //        ):null}
  <nav>
    <div className="nav-wrapper blue"  >
      <Link to={state?"/":"/signin"} className="brand-logo left">Home</Link>
      <ul id="nav-mobile" className="right">
       {renderList()}
      </ul>
    </div>
  </nav>

  
    )
}


export default Navbar


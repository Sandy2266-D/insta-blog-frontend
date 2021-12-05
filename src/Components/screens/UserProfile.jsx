import React,{useEffect,useState,useContext} from 'react'
import { UserContext } from '../../App'
import {useParams} from "react-router-dom"

const UserProfile = () => {
    const[profile,setProfile] = useState(null)
    const {state,dispatch}= useContext(UserContext)
    const {userid} = useParams()
    const[showFollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    console.log(userid)

    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setProfile(result)
        })
    },[])


    const followUser=()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                
                return{
                    ...prevState,
                    user:{
                    ...prevState.user,
                    followers:[...prevState.user.followers,data._id]}
                }
            })
            setShowFollow(false)
        })
    }

    const UnFollow=()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
        })
    }

    return (
        <>
        {profile ? 
    <div style={{maxWidth:"550px", margin:"0px auto"}}>
        <div style={{
          display:"flex",
          justifyContent:"space-around",
         margin: "18px 0px",
         borderBottom:"1px solid grey"}}>
            <div>
           <img style={{width: "160px",height: "160px", borderRadius: "80px"}}
              src={profile.user.pic}
              />
           </div>
           <div>
               <h6>{profile.user.name}</h6>
               <h6>{profile.user.email}</h6>
                   <div style={{display:"flex", justifyContent:"space-around", width:"108%"}}>
                       <h6>{profile.posts.length} posts</h6>
                       <h6>{profile.user.followers.length} followers</h6>
                       <h6>{profile.user.following.length} following</h6>
                       
                   </div>
                   {
                       showFollow ?
                       <button style={{margin:"10px"}} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}>
                        Follow
                    </button>
                    :
                    <button style={{margin:"10px"}} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>UnFollow()}>
                        UnFollow
                    </button>
                   }
                   
                    
                  
           </div>
       </div>
       <div className="gallery">
           {
               profile.posts.map(item=>{
                   return(
                       <img key={item._id} className="item" src={item.photo} alt={item.title} />
                   )
               })
           }
        </div>
   </div>
        :
        <h2>Loading..!</h2>}
        
      </>  
    )
}

export default UserProfile

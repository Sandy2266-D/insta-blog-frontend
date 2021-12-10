import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from "../../App"
import { Link } from 'react-router-dom'
import {CgProfile} from "react-icons/cg"
import SendIcon from "@material-ui/icons/Send"
import {TextField, Button } from '@material-ui/core';

const Home = () => {
    const[data,setData]=useState([])
    const{state,dispatch}= useContext(UserContext)
    const[comments,setComments]=useState("")
    
    // const handleUserInput = (e) => {
    //     setData(e.target.value);
    //   };
    useEffect(()=>{
        fetch("/allpost",{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            setData(result.posts)
        })
    },[])

    const likePost= (id)=>{
        fetch('/like',{
            method: "put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const unLikePost=(id)=>{
        fetch('/unlike',{
            method: "put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const addComment=(text,postId)=>{
        fetch('/comment',{
            method: "put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                    
                }else{
                    return item
                    
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }


    const deletePost =(postid)=>{
        fetch(`/deletepost/${postid}`,{
            method: "delete",
            headers:{
                Authorization: "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData= data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }


    return (
        <div className="home">
            {
                data.map(item=>{
                   return( 
                    <div className="card home-card" key={item._id}>
                    <h5>&nbsp;<CgProfile />&nbsp;
                    <Link to={item.postedBy._id !== state._id ?"/profile/"+item.postedBy._id : "/profile" }>
                        {item.postedBy.name} </Link>
                    {item.postedBy._id === state._id 
                    &&
                    <i className="material-icons" style={{float: "right"}}
                    onClick={()=>deletePost(item._id)}
                    >delete</i>
                    }
                    
                    </h5>
                    
                    
                    <div className="card-image">
                        <img src={item.photo}/>
                    </div>
                    <div className="card-content">
                        <i className="material-icons" style={{color:"red"}}>favorite</i> &nbsp;
                        {
                            item.likes.includes(state._id)
                            ?
                            <i className="material-icons"
                            onClick={()=>{unLikePost(item._id)}}>
                            thumb_down</i>
                            :
                            <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}>
                            thumb_up</i>
                        }
                                               
                        <h6>{item.likes.length} likes</h6>
                        <h6>{item.title}</h6>
                        <p>{item.desc}</p>

                        {
                            item.comments.map(record=>{
                                return(
                                    <h6 key={record._id}><span style={{fontWeight:"500"}}>
                                        {record.postedBy.name}
                                        </span> &nbsp;
                                        {
                                            record.text
                                        }</h6>
                                )
                            })
                        }
                        <form 
                        onSubmit={(e)=>{addComment(e.target[0].value,item._id)}}>
                        <input type="text"
                        placeholder="add a comment"
                        onChange={(e)=>addComment(e.target.value)}
                        />
                        <Button
                        size="small" variant="outlined"
                        endIcon={<SendIcon/>}
                        type="submit"
                        onClick={(e)=>{addComment(e.target[0].value,item._id)}}>
                        Comment
                        </Button>
                        </form>
                    </div>
                    </div>
                   )
                })
            }
            
        </div>
    )
}

export default Home

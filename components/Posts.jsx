import React,{useState, useEffect} from 'react'
import Post from "./Post";
import {collection, onSnapshot, orderBy, query} from "@firebase/firestore";
import {db} from "../firebase";



// const DUMMY_DATA =[
//     {
//         id: 123,
//         username: "sonussss",
//         userImg: "https://media-exp1.licdn.com/dms/image/C5603AQFX-WDbOZjl5g/profile-displayphoto-shrink_200_200/0/1639852374140?e=2147483647&v=beta&t=IA5GQkHUmzJpc2F7-6LvFKZtC8F2AWS0X0uJCCgGDAU",
//         img: "https://images.unsplash.com/photo-1501261379837-c3b516327829?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHxuYXR1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//         caption: "hey whatsapp here your boy ssssonu sss is here to share our knowledge with u guys damn good all to see!",
//     },
//     {
//         id: 345,
//         username: "sonussss",
//         userImg: "https://media-exp1.licdn.com/dms/image/C5603AQFX-WDbOZjl5g/profile-displayphoto-shrink_200_200/0/1639852374140?e=2147483647&v=beta&t=IA5GQkHUmzJpc2F7-6LvFKZtC8F2AWS0X0uJCCgGDAU",
//         img: "https://images.unsplash.com/photo-1585151971162-f2632bc8005d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1bGRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//         caption: "hey whatsapp here your boy ssssonu sss is here to share our knowledge with u guys damn good all to see!",
//     },

// ]



const Posts = () => {

  const [posts, setpost]=useState([]);

  useEffect(() => 
    onSnapshot(query(collection(db, "posts"),orderBy("timestamp", "desc")), (snapshot) => {
       setpost(snapshot.docs);
   }),
    [db]
    );
  


  return (
    <div >
        {
            posts.map(post=> (

             <Post key={post.id} id={post.id} username={post.data().username} userImg={post.data().profileImg} img={post.data().image} caption={post.data().caption}  /> 
            )) 
        }

        
    </div>
  )
}

export default Posts
import React, { Fragment, useState, useRef } from "react";
import { modalkaState } from "../atoms/modalAtoms";
import { Snapshot, useRecoilState, useRecoilValue } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { CameraIcon } from "@heroicons/react/outline";
import {db, storage} from "../firebase"
import {addDoc, collection, doc, updateDoc, serverTimestamp} from "@firebase/firestore"
import { useSession } from "next-auth/react";
import { ref, uploadString , getDownloadURL} from "firebase/storage";


const Modals = () => {
  const {data:session} = useSession();
  const [openmodal, setOpenmodal] = useRecoilState(modalkaState);
  const [selectFile, setSelectfile]=useState(null);
  const [loading, setLoading]=useState(false)
  const captionRef= useRef(null)
  const filePickerRef = useRef(null);

  const closeHandler = () => {
    setOpenmodal(false);
    console.log("closed");
  };

  const uploadPost = async()=>{
  if(loading) return;

  setLoading(true);


  //1 create post and add to firestore "posts" collection
  //2 get the post ID for the newly created post
  // 3 upload the image to firebase storage wiith the post ID
  //4 get a download URL from firebase storage and update the original post with image

   const docRef = await addDoc(collection(db, "posts"),{
     username : session.user.username,
     caption : captionRef.current.value,
     profileImg: session.user.image,
     timestamp: serverTimestamp(),
     
   })
   console.log(docRef.id);

   const imageRef = ref(storage, `posts/${docRef.id}/image`)

   await uploadString(imageRef, selectFile, "data_url")
   .then(async (Snapshot) =>{

     const downloadURL =  await getDownloadURL(imageRef);

     await updateDoc(doc(db, "posts", docRef.id),{
       image: downloadURL,
     })
     
   })

   setOpenmodal(false);
   setLoading(false);
   setSelectfile(null)

  }

  const addImageToPost =(e)=>{
    const reader = new FileReader();
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent)=>{
      setSelectfile(readerEvent.target.result);
    }
    
  }

  return (
    
    <>
      <Modal
        // closeButton
        animated={false}
        aria-labelledby="modal-title"
        open={openmodal}
        onClose={closeHandler}
      >
        <div className="inline-block align-bottom items-center  rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>

       {
         selectFile ? (
          <img className="w-full object-contain cursor-pointer" src={selectFile} onClick={()=> setSelectfile(null)} alt="" />
         ) : (
          <div onClick={()=> filePickerRef.current.click()} className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer">
              <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
         )
       }



            

            <div>
              <div className="mt-3 text-center sm:mt-5">
                <Text className="text-lg leading-6 font-medium text-gray-900">
                  Upload a photo
                </Text>
                <div>
                  <input type="file" onChange={addImageToPost} ref={filePickerRef} hidden />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Please Enter a caption..."
                    className="border-none focus:ring-0 w-full text-center"
                    ref={captionRef}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={uploadPost}
                disabled={!selectFile}
                className="inline-flex justify-center w-full  rounded-md border border-transparent shadow-sm px-2 py-2 bg-red-600
                 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:bg-gray-300"
              >
                {loading ? "Uploading..." : "Upload Post"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Modals;

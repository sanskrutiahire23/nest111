import { useState } from "react";
import Photocontext from "./Photocontext";

const Photostate=(props)=> {
    const host="http://localhost:5000"

    const initialphotos=[]
    const [photos,setphotos]=useState(initialphotos)

    const getallphotos= async ()=> {
        const response=await fetch(`${host}/api/photos/fetchallphotos`, {
            method:"GET",
            headers: {  
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              },
        })
        const json=await response.json()
        setphotos(json)

    }

    const deletephotos=async (id)=> {
        const response=await fetch(`${host}/api/photos/deletephoto/${id}`, {
            method:"DELETE",
            headers: {  
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              },
        })
        const afterdeleted=photos.filter((photo)=> {
            return photo._id!==id
        })
        setphotos(afterdeleted)
    }

    const addphotos = async (formData) => {

      
        try {
          const response = await fetch(`${host}/api/photos/addphotos`, {
            method: 'POST',
            headers: {
              "auth-token":localStorage.getItem('token')
 // Correct auth token
            },
            body: formData, // Send FormData as the request body
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "An error occurred");
          }
      
          const newphoto = await response.json(); // Parse the response as JSON
          setphotos((prevPhotos) => [...prevPhotos, newphoto]); // Add new photo to state
      
        } catch (error) {
          console.error("Error adding photo:", error.message); // Log the error message
          alert(error.message); // Optionally show an alert to the user
        }
      };
      

    const editPhoto = async (id, updatedData) => {
        const formData = new FormData();
        if (updatedData.title) formData.append("title", updatedData.title);
        if (updatedData.tag) formData.append("tag", updatedData.tag);
        if (updatedData.photo) formData.append("photo", updatedData.photo);
      
        const response = await fetch(`${host}/api/photos/updatephoto/${id}`, {
          method: "PUT",
          headers:{
            "auth-token":localStorage.getItem('token')
        },
          body: formData,
        });
      
        const updatedPhoto = await response.json();
        setphotos((prev) => prev.map((p) => (p._id === id ? updatedPhoto : p)));
      };
      
      const addtofav= async (id) => {
        try {
            const response=await fetch(`${host}/api/photos/addtofavourites/${id}`,{
                method:"POST",
                headers:{
                    "Content-type":"applicaton/json",
                    "auth-token":localStorage.getItem('token')
                },
            })
            const favouritephotos=await response.json()
            // setphotos(favouritephotos)
        }  catch (error) {
            console.error("Error adding photo:", error.message); // Log the error message
            alert(error.message); // Optionally show an alert to the user
          }
      }

      const loadfavourites = async () => {
        try {
          const response = await fetch(`${host}/api/photos/getfavourites`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
          });
      
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Failed to fetch favourites");
          }
      
          setphotos(data); // Assuming `setphotos` manages your favorite photos
        } catch (error) {
          console.error("Error fetching favourites:", error.message);
        }
      };
      
      const removefave = async (id)=> {
        try{
            const response=await fetch(`${host}/api/photos/removefavourites/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-type":"application/json",
                    "auth-token":localStorage.getItem('token')
                }
            })
            const data=await response.json()
            if (!response.ok) {
                throw new Error(data.error || "Failed to remove item");
            }
            // setphotos(data)
            setphotos((prevPhotos) =>
            prevPhotos.filter((photo) => photo._id !== id)
          ); 
        } catch (error) {
            console.error("Error removing favourite:", error.message); // Log the error message 
          }
      }

      const addtotrash= async (id)=> {
        try{
            const response=await fetch(`${host}/api/photos/addtotrash/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-type":"application/json",
                    "auth-token":localStorage.getItem('token')
                }
            })
            const data=await response.json()
            if (!response.ok) {
                throw new Error(data.error || "Failed to remove item");
            }
            const afterdeleted=photos.filter((photo)=> {
                return photo._id!==id
            })
            setphotos(afterdeleted)
        } catch (error) {
            console.error("Error removing favourite:", error.message); // Log the error message 
          }
      }

      const fetchtrash = async () => {
        try {
          const response = await fetch(`${host}/api/photos/gettrash`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
          });
      
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Failed to fetch favourites");
          }
      
          setphotos(data); // Assuming `setphotos` manages your favorite photos
        } catch (error) {
          console.error("Error fetching trash:", error.message);
        }
      };

      const restore= async (id)=> {
        try{
            const response=await fetch(`${host}/api/photos/restore/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-type":"application/json",
                    "auth-token":localStorage.getItem('token')
                }
            })
            const data=await response.json()
            if (!response.ok) {
                throw new Error(data.error || "Failed to remove item");
            }
            const afterdeleted=photos.filter((photo)=> {
                return photo._id!==id
            })
            setphotos(afterdeleted)
        } catch (error) {
            console.error("Error removing favourite:", error.message); // Log the error message 
          }
      }

    return (
        <>
        <Photocontext.Provider value={{photos,getallphotos,deletephotos,addphotos,editPhoto,addtofav,loadfavourites,removefave,addtotrash,fetchtrash,restore}}>
            {props.children}
        </Photocontext.Provider>
        </>
    )
}

export default Photostate
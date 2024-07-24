import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import toast, { Toaster } from "react-hot-toast"
import { Link } from "react-router-dom"
import axios from 'axios';

import "./UpdatePlant.css"

function UpdatePlant() {
    const {id} = useParams();

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const updatePlant = async () =>{
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/plant/${id}`, {
            name : name,
            category : category,
            image : image,
            price : price,
            description : description
        })
        toast.success(response.data.mess)
    }

    const loadPlant = async () => {
        if(!id){
            return
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/plant/${id}`)
        const plantData = response.data.data
        const {name,category,image,price,description} = plantData
        
        setName(name)
        setCategory(category)
        setImage(image)
        setPrice(price)
        setDescription(description)
    }
    useEffect(()=>{
            loadPlant(id)
        }, [id])

  return (
    <div>
        <h1 className="title">Update Plant</h1>
         
         <form className="form-section">
            <input type="text" placeholder="Enter Plant Name" value={name} onChange={(e)=>setName(e.target.value)} className="plant-input"/>

            <input type="text" placeholder="Enter Plant Category" value={category} onChange={(e)=>setCategory(e.target.value)} className="plant-input"/>

            <img src={image} className="img-preview" alt='img'/>
            <input type="text" placeholder="Enter Plant ImageURL" value={image} onChange={(e)=>setImage(e.target.value)} className="plant-input"/>

            <input type="number" placeholder="Enter Plant Price" value={price} onChange={(e)=>setPrice(e.target.value)} className="plant-input"/>

            <input type="text" placeholder="Enter Plant Description" value={description} onChange={(e)=>setDescription(e.target.value)} className="plant-input"/>

            <button type="button" className="add-btn" onClick={updatePlant}>Update Plant</button>
         </form>
         <br/>
         <Link to="/" className="back-link">Show All Plants</Link>
         <Toaster/>
    </div>
  )
}

export default UpdatePlant
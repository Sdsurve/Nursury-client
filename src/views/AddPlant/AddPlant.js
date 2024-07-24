import { useState } from "react"
import "./AddPlant.css"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import logo from "./R.png"
import { Link } from "react-router-dom"

function AddPlant() {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const addPlant = async () => {
        toast.loading("Adding plant.....")
        if(!name || !category || !image || !price || !description){
            toast.error("Please Enter all details")
            return
        }
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/plant`, {
            name : name,
            category : category,
            image : image,
            price : price,
            description : description
        })
        toast.dismiss()
        toast.success(response.data.message)
        setName("")
        setCategory("")
        setImage("")
        setPrice("")
        setDescription("")
    }

  return (
    <div className="main-div-add">
        <span className="title"><img src={logo} alt="logo" className="logo-img"/>Add Plant</span>
         
         <form className="form-div">
            <input type="text" placeholder="Enter Plant Name" value={name} onChange={(e)=>setName(e.target.value)} className="plant-input"/>

            <input type="text" placeholder="Enter Plant Category" value={category} onChange={(e)=>setCategory(e.target.value)} className="plant-input"/>

            <img src={image} className="img-preview"/>
            <input type="text" placeholder="Enter Plant ImageURL" value={image} onChange={(e)=>setImage(e.target.value)} className="plant-input"/>

            <input type="number" placeholder="Enter Plant Price" value={price} onChange={(e)=>setPrice(e.target.value)} className="plant-input"/>

            <input type="text" placeholder="Enter Plant Description" value={description} onChange={(e)=>setDescription(e.target.value)} className="plant-input"/>

            <button type="button" onClick={addPlant} className="add-btn">Add Plant</button>
         </form>
         <br/>
         <Link to="/" className="back-link">Show All Plants</Link>
         <Toaster/>
    </div>
  )
}

export default AddPlant
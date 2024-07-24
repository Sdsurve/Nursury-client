import { useEffect, useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

import logo from "./logo.png"
import "./Home.css"
import PlantCard from "../../components/PlantCard/PlantCard"


function Home() {

  const [plants, setPlants] = useState([])

  const loadPlants = async () =>{
    toast.loading("Loading plants....")
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/plants`)
    toast.dismiss()
    toast.success("Plants loaded successfully")
    setPlants(response.data.data);
  }

  useEffect(()=>{
    loadPlants()
  }, [])

  return (
    < > <div className="main-div">
      <img className="logo" src={logo} alt="logo"/>
      <div className="plantCard-div">
        {
          plants.map((plant, i)=>{
            const {_id, name, category, image, price, description} =plant
            return <PlantCard 
            key={i} 
            _id={_id} 
            name={name} 
            category={category} 
            image={image} 
            price={price} 
            description={description} 
            loadPlants={loadPlants}/>
          })
        }
        <Toaster/>
        
      </div>
      </div>
    </>
  )
}

export default Home
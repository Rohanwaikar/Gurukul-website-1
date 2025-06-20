import useHttp from "./useHttp.jsx";
import MealsItem from "./MealsItem.jsx";
import baseUrl from "../baseUrl.js"

import { motion } from "framer-motion";

import UserProgressContext from "../store/UserProgressContext.jsx";
import { useContext } from "react";

export default function Meals(){
    const userProgressContext = useContext(UserProgressContext);

const { data, loading, error } = useHttp(`${baseUrl}/meals`, {}, []);
    return(
        <section>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <motion.h2 className="center" whileHover={{ scale: 1.1 }}>&#9889;Explore the Spaces&#9889;</motion.h2>

            <ul id="meals">
                {data.map(meal => (
                    <MealsItem key={meal.id} 
                    name ={meal.name}
                    description={meal.description}
                    image={`${baseUrl}/${meal.image}`} 
                    />
                ))}
            </ul>   

            <p className="center">
                <button className="btn" onClick={userProgressContext.showCheckout}>
                    <motion.h2 whileHover={{ scale: 1.1  }}>Enquiry Form</motion.h2>
                    </button>
            </p>    
        </section>
    );
}

import useHttp from "./useHttp.jsx";
import MealsItem from "./MealsItem.jsx";
import baseURL from "../baseURL.js"

import UserProgressContext from "../store/UserProgressContext.jsx";
import { useContext } from "react";

export default function Meals(){
    const userProgressContext = useContext(UserProgressContext);

const { data, loading, error } = useHttp(`${baseUrl}/meals`, {}, []);
    return(
        <section>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

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
                    <h2>Enquiry Form</h2>
                    </button>
            </p>    
        </section>
    );
}

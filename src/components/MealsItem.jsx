import { motion } from "framer-motion";
 
export default function MealsItem({ image, name, description }) {
  return (
    <li className="meal-item">
        <motion.article whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <img src={image} alt={name} />
            <div className="meal-item__content">
            <h3>{name}</h3>
            {/* <p className="meal-item__description">{description}</p> */}
            </div>  
        </motion.article>
    </li>
  );
}
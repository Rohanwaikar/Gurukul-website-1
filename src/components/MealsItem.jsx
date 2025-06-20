
 
export default function MealsItem({ image, name, description }) {
  return (
    <li className="meal-item">
        <article>
            <img src={image} alt={name} />
            <div className="meal-item__content">
            <h3>{name}</h3>
            {/* <p className="meal-item__description">{description}</p> */}
            </div>
            
        </article>
    </li>
  );
}
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './CarouselComponent.css'; // Custom styling if any
import baseUrl from "../baseUrl.js"

export default function CarouselComponent() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(`${baseUrl}/carousel-images`); // or your deployed URL
        const data = await response.json();
        console.log('Fetched carousel data:', data);
        setImages(data);
      } catch (error) {
        console.error('Error fetching carousel images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (loading) {
    return <p>Loading carousel...</p>;
  }

  return (
    <div>
      <h2 className='center'>&#127775;Memories from the retreat&#127775;</h2>
      <div className="carousel">
        <Carousel showThumbs={false} autoPlay infiniteLoop> 
          {images.map((img) => (
            <div key={img.id}>
            <img src={`${baseUrl}/${img.image}`} alt={img.name} />
          </div>
        ))}
      </Carousel>
    </div>
    </div>
  );
}

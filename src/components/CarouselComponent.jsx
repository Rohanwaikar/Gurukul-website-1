import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './CarouselComponent.css'; // Custom styling if any
import baseUrl from "../baseUrl.js"
import { motion, useScroll, useTransform } from 'framer-motion';


export default function CarouselComponent() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -20]);
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
      <motion.h2 className='center' whileHover={{ scale: 1.1 }} style={{ y }} transition={{ duration: 0.5 }} >&#127775;Memories from the retreat&#127775;</motion.h2>
      <div className="carousel">
        <Carousel showThumbs={false} autoPlay infiniteLoop> 
          {images.map((img) => (
            <motion.div key={img.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.4 }}
              style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <img src={`${baseUrl}/${img.image}`} alt={img.name} />
          </motion.div>
        ))}
      </Carousel>
    </div>
    </div>
  );
}

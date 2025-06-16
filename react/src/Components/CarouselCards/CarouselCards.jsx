import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Required for carousel functionality
import './CarouselCards.css'; // Optional custom styles

const carouselData = [
  {
    title: 'Travel with Confidence',
    text: '24/7 Chatbot and customer support for your journey.',
    img: 'https://placehold.co/600x400',
    link: '/',
    buttonText: 'Chat Now',
  },
  {
    title: 'Explore the World',
    text: 'Find the best flight deals to your dream destinations.',
    img: 'https://placehold.co/600x400',
    link: '/flights',
    buttonText: 'Book Flights',
  },
  {
    title: 'Comfortable Stays',
    text: 'Book luxury and budget hotels with ease.',
    img: 'https://placehold.co/600x400',
    link: '/hotels',
    buttonText: 'Find Hotels',
  },
  {
    title: 'Smooth Transfers',
    text: 'Airport pickups and drop-offs tailored for you.',
    img: 'https://placehold.co/600x400',
    link: '/airport-transfers',
    buttonText: 'View Transfers',
  },

];

const CarouselCards = () => {
  return (
    <div id="travelCarousel" className="carousel slide mb-5" data-bs-ride="carousel">

      {/* Carousel indicators */}
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#travelCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#travelCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#travelCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#travelCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
      </div>

      <div className="carousel-inner">
        {carouselData.map((item, idx) => (
          <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
            <div className="card bg-dark text-white border-0 rounded-0">
              <img src={item.img} className="card-img" alt={item.title} />
              <div className="card-img-overlay d-flex flex-column justify-content-center text-center bg-overlay">
                <h2 className="card-title display-5 fw-bold">{item.title}</h2>
                <p className="card-text lead">{item.text}</p>
                <a href={item.link} className="btn btn-primary mt-3 w-auto mx-auto">{item.buttonText}</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls for next annd previous */}
      <button className="carousel-control-prev" type="button" data-bs-target="#travelCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#travelCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default CarouselCards;

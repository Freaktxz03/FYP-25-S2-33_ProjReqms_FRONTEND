import React from 'react';
import './HomePage.css'; // Optional CSS for additional styling
import CarouselCards from '../CarouselCards/CarouselCards';

const HomePage = () => {
  return (
    <div className="container mt-5">

      <CarouselCards/>

      <h2 className="text-center mb-4">Welcome to SIM TRAVELS</h2>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm h-100">
            <img src="https://placehold.co/400x200" className="card-img-top" alt="Travel Destination"/>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Placeholder</h5>
              <p className="card-text">Placeholder Description</p>
              <a href="/" className="btn btn-primary mt-auto">Placeholder Button Text</a>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm h-100">
            <img src="https://placehold.co/400x200" className="card-img-top" alt="Travel Destination"/>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Placeholder</h5>
              <p className="card-text">Placeholder Description</p>
              <a href="/" className="btn btn-primary mt-auto">Placeholder Button Text</a>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div className="card shadow-sm h-100">
              <img src="https://placehold.co/400x200" className="card-img-top" alt="Travel Destination"/>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Membership</h5>
                <p className="card-text">Sign up for SIM TRAVELS member and get exlusive benefits and rewards when you reserve your holidays with us!</p>
                <a href="/flights" className="btn btn-primary mt-auto">Explore Flights</a>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div className="card shadow-sm h-100">
              <img src="https://placehold.co/400x200" className="card-img-top" alt="Shopping Offers"/>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Elevate your lifestyle</h5>
                <p className="card-text">Looking for booking offers? Check out our seasonal and monthly promotions, treat yourself or your loved ones.</p>
                <a href="/" className="btn btn-primary mt-auto">Enjoy Promotions</a>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div className="card shadow-sm h-100">
              <img src="https://placehold.co/400x200" className="card-img-top" alt="Frequently Asked Questions"/>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Frequently Asked Questions (FAQs)</h5>
                <p className="card-text">Do you have questions? Find your answers here!</p>
                <a href="/" className="btn btn-primary mt-auto">Browse FAQ</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


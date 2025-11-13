import React, { useState } from 'react';
import ProductList from './ProductList'; 
import CartItem from './CartItem';
import './App.css'; 

// Component representing the original styled home screen
const Home = ({ onStartShopping }) => (
    <div className="home-container"> 
        <div className="home-layout">
            
            {/* LEFT SECTION: Title, Tagline, and Button */}
            <div className="home-content-left">
                <h1 className="home-heading">Welcome to Paradise Nursery</h1>
                <p className="home-tagline">Where Green Meets Serenity. Find the perfect plant for your home!</p>
                <button 
                    className="get-started-button" 
                    onClick={onStartShopping}
                >
                    Get Started
                </button>
            </div>

            {/* CENTER SECTION: Small Vertical Divider */}
            <div className="home-divider-center"></div>

            {/* RIGHT SECTION: Placeholder Text */}
            <div className="home-content-right">
                <p>
                    **Paradise Nursery:** Your sanctuary for indoor greenery. We specialize in curating low-maintenance, air-purifying, and aromatic plants designed to enhance both your environment and well-being.
                    <br /><br />
                    Our mission is to make quality plant care accessible to everyone, from novice enthusiasts to seasoned gardeners. Explore our unique collections and let us bring tranquility to your space.
                </p>
            </div>
        </div>
    </div>
);

// Main App component that manages the view (No functional changes here)
function App() {
    const [isProductsModalOpen, setIsProductsModalOpen] = useState(false); 
    const [isCartModalOpen, setIsCartModalOpen] = useState(false); 
    const [currentView, setCurrentView] = useState('home'); 

    const handleOpenProductsModal = () => {
        setIsProductsModalOpen(true);
        setIsCartModalOpen(false); 
    };
    
    const handleOpenCartModal = () => {
        setIsProductsModalOpen(false); 
        setIsCartModalOpen(true); 
    };
    
    const handleCloseModal = () => {
        setIsProductsModalOpen(false);
        setIsCartModalOpen(false);
    };
    
    const handleHomeClick = () => {
        handleCloseModal(); 
        setCurrentView('home');
    };

    const handleContinueShopping = () => {
        handleCloseModal(); 
        handleOpenProductsModal();
    }
    
    let content;
    if (currentView === 'home') {
        content = <Home onStartShopping={handleOpenProductsModal} />; 
    } else {
        content = <Home onStartShopping={handleOpenProductsModal} />;
    }

    return (
        <div className="App">
            {content}
            
            {/* 1. Products Modal */}
            {isProductsModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div 
                        className="modal-content" 
                        onClick={e => e.stopPropagation()}
                    >
                        <button className="modal-close-btn" onClick={handleCloseModal}>&times;</button>
                        
                        <ProductList 
                            onHomeClick={handleHomeClick} 
                            onOpenCart={handleOpenCartModal} 
                        />
                    </div>
                </div>
            )}

            {/* 2. Cart Modal */}
            {isCartModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div 
                        className="modal-content" 
                        onClick={e => e.stopPropagation()}
                    >
                        <button className="modal-close-btn" onClick={handleCloseModal}>&times;</button>
                        
                        <CartItem 
                            onContinueShopping={handleContinueShopping} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

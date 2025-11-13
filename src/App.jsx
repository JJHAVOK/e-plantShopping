import React, { useState } from 'react';
import ProductList from './ProductList'; 
import CartItem from './CartItem';
import './App.css'; 

// Component representing the original styled home screen
const Home = ({ onStartShopping }) => (
    <div className="home-container"> 
        <h1 className="home-heading">Welcome to Paradise Nursery</h1>
        <p className="home-tagline">Where Green Meets Serenity. Find the perfect plant for your home!</p>
        <button 
            className="get-started-button" 
            onClick={onStartShopping}
        >
            Get Started
        </button>
    </div>
);

// Main App component that manages the view
function App() {
    const [isProductsModalOpen, setIsProductsModalOpen] = useState(false); 
    const [isCartModalOpen, setIsCartModalOpen] = useState(false); 
    const [currentView, setCurrentView] = useState('home'); 

    const handleOpenProductsModal = () => {
        setIsProductsModalOpen(true);
        setIsCartModalOpen(false); // Ensure cart modal is closed
    };
    
    // Handler to open the cart modal from the ProductList component's navbar
    const handleOpenCartModal = () => {
        setIsProductsModalOpen(false); // Close products modal
        setIsCartModalOpen(true); // Open cart modal
    };
    
    // Universal close function (used by clicking outside or the 'X' button)
    const handleCloseModal = () => {
        setIsProductsModalOpen(false);
        setIsCartModalOpen(false);
    };
    
    // Handler for the Home link
    const handleHomeClick = () => {
        handleCloseModal(); // Close any open modal
        setCurrentView('home');
    };

    // Handler for "Continue Shopping" button inside CartItem
    const handleContinueShopping = () => {
        handleCloseModal(); 
        handleOpenProductsModal(); // Re-open the products modal
    }
    
    let content;
    if (currentView === 'home') {
        content = <Home onStartShopping={handleOpenProductsModal} />; 
    } else {
        // Default to Home view
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
                        {/* X close button */}
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
                        {/* X close button */}
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
import { useState } from 'react';
import { Link } from 'wouter';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <span className="material-icons text-primary">eco</span>
            <h1 className="text-xl font-medium text-neutral-900">EcoMeet</h1>
          </a>
        </Link>
        
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-neutral-700 hover:text-primary transition-colors">About</a>
          <a href="#" className="text-neutral-700 hover:text-primary transition-colors">How It Works</a>
          <a href="#" className="text-neutral-700 hover:text-primary transition-colors">Impact</a>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">Sign In</button>
        </div>
        
        <button 
          className="md:hidden text-neutral-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-icons">{mobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 px-4 py-2">
          <nav className="flex flex-col space-y-2">
            <a href="#" className="py-2 text-neutral-700 hover:text-primary transition-colors">About</a>
            <a href="#" className="py-2 text-neutral-700 hover:text-primary transition-colors">How It Works</a>
            <a href="#" className="py-2 text-neutral-700 hover:text-primary transition-colors">Impact</a>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors mt-2">Sign In</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

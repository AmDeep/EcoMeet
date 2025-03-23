const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-3">
              <span className="material-icons text-primary">eco</span>
              <h2 className="text-xl font-medium text-white">EcoMeet</h2>
            </div>
            <p className="text-sm max-w-md">A sustainable solution for planning gatherings that minimize environmental impact through optimized transit options and location selection.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white font-medium mb-3">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Carbon Calculator</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Transit Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">© {new Date().getFullYear()} EcoMeet. All rights reserved.</div>
          <div className="flex space-x-4">
            <a href="#" className="text-neutral-300 hover:text-primary transition-colors">
              <span className="material-icons">facebook</span>
            </a>
            <a href="#" className="text-neutral-300 hover:text-primary transition-colors">
              <span className="material-icons">auto_awesome</span>
            </a>
            <a href="#" className="text-neutral-300 hover:text-primary transition-colors">
              <span className="material-icons">language</span>
            </a>
            <a href="#" className="text-neutral-300 hover:text-primary transition-colors">
              <span className="material-icons">email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

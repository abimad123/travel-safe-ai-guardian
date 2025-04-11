
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TravelGuardian</h3>
            <p className="text-gray-600">
              Explore the world with confidence using real-time safety data and
              travel recommendations.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-600 hover:text-blue-600">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/trip-planner" className="text-gray-600 hover:text-blue-600">
                  Trip Planner
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-600">
              Have questions or feedback? Contact our support team.
            </p>
            <p className="text-gray-600 mt-2">support@travelguardian.example.com</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} TravelGuardian. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryModal from "./CountryModal";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    // Fetch all countries on component mount
    fetchAllCountries();
  }, []);

  const fetchAllCountries = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchCountries = async () => {
    if (!searchTerm) {
      fetchAllCountries();
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`);
      setCountries(response.data);
    } catch (error) {
      console.error("Error searching countries:", error);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const filterByRegion = async (region) => {
    setRegion(region);
    if (!region) {
      fetchAllCountries();
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
      setCountries(response.data);
    } catch (error) {
      console.error("Error filtering countries by region:", error);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchCountries();
  };

  // Function to handle country selection and show modal
  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Explore Countries</h1>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="flex">
            <input
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 w-full border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>
        
        {/* Region Filter */}
        <div className="w-full md:w-64">
          <select
            value={region}
            onChange={(e) => filterByRegion(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="americas">Americas</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {countries.length > 0 ? (
            countries.map((country) => (
              <div 
                key={country.cca3} 
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 cursor-pointer"
                onClick={() => handleCountryClick(country)}
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{country.name.common}</h2>
                  <div className="text-sm">
                    <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
                    <p><span className="font-semibold">Region:</span> {country.region}</p>
                    <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-xl">No countries found.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Country Modal */}
      {selectedCountry && (
        <CountryModal 
          country={selectedCountry} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default Home;

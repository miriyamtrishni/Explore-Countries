import React from "react";

const CountryModal = ({ country, onClose }) => {
  if (!country) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="flex items-center justify-between border-b dark:border-gray-700 p-4">
          <h2 className="text-2xl font-bold dark:text-white">{country.name.common}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Country details */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img 
              src={country.flags.svg} 
              alt={`Flag of ${country.name.common}`} 
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Basic Information</h3>
              <p className="dark:text-gray-300">
                <span className="font-medium">Native Name:</span> {Object.values(country.name.nativeName || {})[0]?.common || country.name.common}
              </p>
              <p className="dark:text-gray-300">
                <span className="font-medium">Population:</span> {country.population.toLocaleString()}
              </p>
              <p className="dark:text-gray-300">
                <span className="font-medium">Region:</span> {country.region}
              </p>
              <p className="dark:text-gray-300">
                <span className="font-medium">Sub Region:</span> {country.subregion || 'N/A'}
              </p>
              <p className="dark:text-gray-300">
                <span className="font-medium">Capital:</span> {country.capital?.join(', ') || 'N/A'}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Additional Details</h3>
              <p className="dark:text-gray-300">
                <span className="font-medium">Top Level Domain:</span> {country.tld?.join(', ') || 'N/A'}
              </p>
              <p className="dark:text-gray-300">
                <span className="font-medium">Currencies:</span> {
                  Object.values(country.currencies || {}).map(currency => currency.name).join(', ') || 'N/A'
                }
              </p>
              <p className="dark:text-gray-300">
                <span className="font-medium">Languages:</span> {
                  Object.values(country.languages || {}).join(', ') || 'N/A'
                }
              </p>
            </div>
            
            {country.borders && country.borders.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Border Countries</h3>
                <div className="flex flex-wrap gap-2">
                  {country.borders.map(border => (
                    <span 
                      key={border} 
                      className="px-4 py-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 shadow-sm rounded-md"
                    >
                      {border}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryModal;

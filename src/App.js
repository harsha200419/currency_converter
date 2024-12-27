import React, { useState, useEffect } from 'react';

const App = () => {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [conversionResult, setConversionResult] = useState(null);

    useEffect(() => {
        fetch('https://api.exchangerate-api.com/v4/latest/USD')
            .then((response) => response.json())
            .then((data) => {
                setCurrencies(Object.keys(data.rates));
                setFromCurrency(data.base);
                setToCurrency(Object.keys(data.rates)[0]);
            })
            .catch((error) => console.error('Error fetching currency data:', error));
    }, []);

    const handleConvert = () => {
        if (fromCurrency && toCurrency && amount) {
            fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
                .then((response) => response.json())
                .then((data) => {
                    const rate = data.rates[toCurrency];
                    setConversionResult((amount * rate).toFixed(2));
                })
                .catch((error) => console.error('Error fetching conversion rate:', error));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
            <div className="w-full max-w-lg p-10 bg-white rounded-2xl shadow-lg transform transition duration-300 hover:scale-105">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Currency Converter</h1>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700">From Currency</label>
                        <select
                            id="fromCurrency"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                        >
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700">To Currency</label>
                        <select
                            id="toCurrency"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                        >
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    onClick={handleConvert}
                    className="mt-6 w-full py-3 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                >
                    Convert
                </button>

                {conversionResult && (
                    <div className="mt-8 bg-blue-50 p-6 rounded-lg text-center border border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-700">Converted Amount</h3>
                        <p className="text-2xl font-bold text-blue-800">{conversionResult} {toCurrency}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;

import { useState } from 'react';
import axios from 'axios';

import Fab from '@mui/material/Fab'; //Floating Action Button
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';



function CurrencyConverter() {

    const currencies = ['ADA', 'BNB', 'BTC', 'DOGE', 'DOT', 'ETH', 'EUR', 'ILS', 'JPY', 'LTC', 'SOL', 'USD', 'XRP'];

    const [fromCurrency, setFromCurrency] = useState('BTC');
    const [toCurrency, setToCurrency] = useState('BTC');

    const [fromAmount, setFromAmount] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [result, setResult] = useState(0);

    const convert = () => {

        setIsLoading(true);

        const options = {
            method: 'GET',
            url: 'https://www.alphavantage.co/query',
            params: {
                function: 'CURRENCY_EXCHANGE_RATE',
                from_currency: fromCurrency, 
                to_currency: toCurrency, 
                apikey: process.env.REACT_APP_ALPHA_VANTAGE_KEY
            }
        };

        axios.request(options).then(function(response) {
            const exchangeRate= response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
            setResult(Math.round(fromAmount * exchangeRate*100)/100);
            setIsLoading(false);

        }).catch(function (error) {
            console.error(error);
            setIsLoading(false);
        });
    }


    return (
        <div className = 'currency-converter container'>

            <div className = 'header'><h1>Cryptocurrency Converter</h1></div>


            <div className = 'from'>Convert:</div>
            <div className = 'from'>                                    
                <TextField
                    name    = 'currency-amount'
                    value   = {fromAmount}
                    onChange = {(event) => setFromAmount(event.target.value)}
                    id = 'outlined-number'
                    type = "number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div className = 'from'>
                <Select
                    
                    className = 'selectCurrency'
                    value = {fromCurrency}
                    onChange = {(event) => setFromCurrency(event.target.value)}
                >
                    {currencies.map((currency, _index) => <MenuItem key={_index} value={currency}>{currency}</MenuItem>)}
                </Select>
            </div>


            <div className = 'to'>To:</div>
            <div className = 'to'>
                <Select
                    className = 'selectCurrency'
                    value = {toCurrency}
                    onChange = {(event) => setToCurrency(event.target.value)}
                >
                    {currencies.map((currency, _index) => <MenuItem key={_index} value={currency}>{currency}</MenuItem>)}
                </Select>
            </div>


            <div className = 'buttonArea'>
                {!isLoading 
                    ?   <Fab 
                            id = 'convertButton' 
                            variant="extended" 
                            size="medium" 
                            color="default" 
                            aria-label="convert" 
                            onClick={convert}
                        >
                            Convert!
                        </Fab>
                    
                    :   <CircularProgress color = "success" />
                }
            </div>
            


            <div className = 'result'>
                <h2>{result}</h2>
            </div>

        </div>
    );
}

export default CurrencyConverter;
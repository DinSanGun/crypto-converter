import { useState } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



function CurrencyConverter() {

    const currencies = ['ADA', 'BNB', 'BTC', 'DOGE', 'DOT', 'ETH', 'EUR', 'ILS', 'JPY', 'LTC', 'SOL', 'USD', 'XRP'];

    const [fromCurrency, setFromCurrency] = useState('BTC');
    const [toCurrency, setToCurrency] = useState('BTC');

    const [fromAmount, setFromAmount] = useState(0);

    // const [exchangeRate, setExchangeRate] = useState(0);

    const [isLoading, setIsLoading] = useState(false);


    const [result, setResult] = useState(0);

    const convert = () => {

        setIsLoading(true);

        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {from_currency: fromCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: toCurrency},
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': '17ff3e4814mshc938daf6033c41bp122323jsn5ff8d5bb376c'
            }
        };

        axios.request(options).then(function(response) {
            const exchangeRate= response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
            setResult(fromAmount * exchangeRate);
            console.log(result);
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
                    {!isLoading &&
                        <Button 
                            id = 'convertButton'
                            onClick = {convert} 
                            variant = 'contained'
                            color = 'success'
                            size = 'medium'>  
                            Convert!
                        </Button>
                    }

                    {isLoading &&
                        <LoadingButton loading variant="outlined">
                            Converto!
                        </LoadingButton>
                    }
                </div>

                <div className = 'result'>
                    <h3>{result}</h3>
                </div>

            </div>
    );
}

export default CurrencyConverter;
/* General Styles */
document.body.setAttribute("style","background-color: black; padding: 0; margin: 0; box-sizing: border-box; color: grey; font-family: Arial, Helvetica, sans-serif;");

/* Root to Render ( container )*/
const results = document.createElement("div");
results.setAttribute("style","width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column;");
document.body.appendChild(results);

/* Button Card Payment Simulator */
const button = document.createElement("button");
button.textContent = 'Card Payment Simulator';
button.setAttribute("style","border: 1px solid #222; color: grey; background-color: black; padding: 20px 10px; border-radius: 20px; cursor: pointer; font-size: 25px; transition: ease .3s all;");
button.addEventListener('mouseover', hover);
button.addEventListener('mouseout', hoverOut);
button.setAttribute("onclick", 'paymentSimulator()');
results.appendChild(button);

function hover (e){
    e.target.style.color = 'black';
    e.target.style.backgroundColor = 'grey';
};

function hoverOut (e){
    e.target.style.color = 'grey';
    e.target.style.backgroundColor = 'black';
};

/* Div Last Operation */
const lastOperation = document.createElement("p");
results.appendChild(lastOperation);


/* IMG Calculator */
const img = document.createElement("img");
img.src = "./images/calculator.png";
img.alt = "Calculator Image";
img.setAttribute("style","margin: 10px;");
results.appendChild(img);

/* Button Instructions */
const instructions = document.createElement('button');
instructions.textContent = 'Instructions';
instructions.setAttribute("style","border: 1px solid #222; color: grey; background-color: black; padding: 10px 5px; border-radius: 10px; cursor: pointer; font-size: 20px; transition: ease .3s all;");
instructions.addEventListener('mouseover', hover);
instructions.addEventListener('mouseout', hoverOut);
results.appendChild(instructions);

const steps = document.createElement('p');
steps.textContent = 'Instructions: press Button "Card Payment Simulator" to start'
steps.setAttribute("style","display: none;");
results.appendChild(steps)

// const style = document.createElement("style");
// document.head.appendChild(style);
// style.textContent = '.active{display: block;}';

instructions.addEventListener('click', ()=>{
    if(steps.style.display == 'none'){
        steps.style.cssText = "display: block; color: grey; background-color: black; padding: 10px 5px; font-size: 15px;"    
    }else{
        steps.style.cssText = "display: none; color: grey; background-color: black; padding: 10px 5px; font-size: 15px;"
    };
});

let usdPrice = 0; // variable saved from api

// variables to date
let date = 0;
let stringDate = '';
let dateToRender = ''; // final string to render (dd-mm-yyyy) 

const fetchData = async () => {
    try {
        const res = await fetch(`https://dolarapi.com/v1/dolares/oficial`);
        const data = await res.json();
        // console.log(data)
        usdPrice = data.venta;
        
        renderUsd(data);
        
        // Convert date
        date = data.fechaActualizacion;
        for(let i=0;i<10;i++){
            stringDate = stringDate + date.charAt(i);
        };
        const dateDay = stringDate.slice(8,10);
        const dateMonth = stringDate.slice(5,7);
        const dateYear = stringDate.slice(0,4);
        dateToRender = `${dateDay}-${dateMonth}-${dateYear}`;
        
        renderDate();
    }
    catch (error){
        console.log(error);
        console.log("No cargó");
    }
};

fetchData();

function renderUsd (info) {
    const usdPrice = document.createElement("p");
    results.appendChild(usdPrice);
    usdPrice.setAttribute("style","padding: 10px 10px; border-radius: 10px;margin-bottom: 10px; font-size: 14px;");
    usdPrice.textContent = `Oficial USD Price: $${info.venta}`;
};

function renderDate (){
    const dateToday = document.createElement("p");
    results.appendChild(dateToday);
    dateToday.setAttribute("style","border-radius: 10px;font-size: 12px;");
    dateToday.textContent = `Last update: ${dateToRender}`;
};

const paymentSimulator = () => {
    const option = parseInt(prompt('Insert Option\n 1-Card Payment outside the country\n 0-Exit program'));
    switch (option) {
            case 1:
                let amount = '';
                amount = parseInt(prompt('Insert usd amount'));    
                if (amount < 1){
                    alert('Insert valid usd amount');
                    paymentSimulator();
                }else if(isNaN(amount)){
                    alert('The amount must be entered in numbers');
                    paymentSimulator();
                }
                else{
                    const priceUsdOficial = usdPrice; // oficial usd from api
                    // console.log(usdPrice)
                    const countryTax = 0.30; //30%
                    const incomeTax = 0.30; //30%
                    const amountToPesos = amount*priceUsdOficial
                    const pesosCountryTax = amountToPesos*countryTax
                    const pesosIncomeTax = amountToPesos*incomeTax
                    const amountTotalTax = amountToPesos+pesosCountryTax+pesosIncomeTax
                    alert('You must to pay: $' + amountTotalTax + '\n\n'+'This total include: \namount entered: u$s'+amount+'\namount converted to pesos: $'+amountToPesos+'\ncountryTax: 30%'+' $'+pesosCountryTax+'\n'+'incomeTax: 30%'+' $'+pesosIncomeTax);
                    lastOperation.textContent = `Amount of Last Operation: u$s${amount}`;
                    paymentSimulator();
                };
                break;
            case 0:
                alert('Thank you for using our card payment simulator'); 
                break;
    };
};










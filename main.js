const input = document.querySelector("#input");
const selector = document.querySelector("#currencies");
const button = document.querySelector("#button");
const endresult = document.querySelector('#endresult');

const one = "https://api.nbp.pl/api/exchangerates/rates/A/CHF/";
const two = "https://api.nbp.pl/api/exchangerates/rates/A/EUR/";
const three = "https://api.nbp.pl/api/exchangerates/rates/A/USD/";

const requestOne = axios.get(one);
const requestTwo = axios.get(two);
const requestThree = axios.get(three);

axios
  .all([requestOne, requestTwo, requestThree])
  .then(axios.spread((...responses) => {
    let newArr = responses.map((i) => ({code:i.data.code, value: i.data.rates[0].mid}))
    button.addEventListener('click', (e) => calculate(newArr));
  }))
  .catch(errors => {
    console.log(errors);
  });

function calculate(currArr) {
  if (input.value == "") {
    alert("Wpisz kwotę");
  } else {
    let res = currArr.filter(i => i.code == selector.value)[0].value;
    let result = input.value * res;
    result = result.toFixed(2);
    endresult.textContent = result + "zł"; 
  }
}

// we are creating a string which includes all the symbols are using this string we fetch the random character to generate our password
const symbols = '@#&%[]?<>_/$^*';

// --> FETCHING ALL THE NEEDED ELEMENTS
// sbse pehle jin jin elements me JS ke through changes honge wo sb elements fetch krne pdege
// 1st -> fetching the slider elements through custom attribute
const inputSlider = document.querySelector("[data-lengthSlider]");

// 2nd -> fetching the element that shows length of password
const lengthDisplay = document.querySelector("[data-lengthNumber]");

// 3rd -> fetching the password display field
const passwordDisplay = document.querySelector("[data-passwordDisplay]");

// 4th -> fetching the button from which we copy the password
const copyBtn = document.querySelector("[data-copy]");

// 5th -> fetching the text field from which we copy the password
const copyMsg = document.querySelector("[data-copyMsg]");

// 6th -> fetching the uppercase wala checkbox
const uppercaseCheck = document.querySelector("#uppercase");

// 7th -> fetching the lowercase wala checkbox
const lowercaseCheck = document.querySelector("#lowercase");

// 8th -> fetching the numbers wala checkbox
const numbersCheck = document.querySelector("#numbers");

// 9th -> fetching the symbols wala checkbox
const symbolsCheck = document.querySelector("#symbols");

// 10th -> fetching the indicator which shows the red and green light
const indicator = document.querySelector("[data-indicator]");

// 11th -> fetching the generate password button
const generateBtn = document.querySelector(".generateButton");

// 12th -> fetching all the checkboxes at same time
const allCheckbox = document.querySelectorAll("input[type=checkbox]");


// --> SETTING THE INITIAL VALUES OF THE VARIABLES
// starting me jb hum application start krte hai uss time password ki field empty hoti hai
// so we take a variable and set it to empty
let password = "";

// and initially password length is 10 by default
let passwordLength = 10;

// this variable count the selected checkboxes
let checkCount = 0;

// calling handleSlider() function
handleSlider();

// set strength indicator circle color to grey
setIndicator("#ccc");

// --> CREATING NEEDED FUNCTIONS TO HANDLE THINGS
// 1st Function -> it handles the moving state of slider, and this function sets the passwords length
// iss function ka kaam sirf itna hai k ye Password ki Length ko UI pe reflect krwata hai
function handleSlider() {
    // starting me hmare password ki length hmne 10 set kri hai
    // and we want that hmara slider bhi usi position pe ho initially when we load our application
    inputSlider.value = passwordLength;

    // and we also have to make sure that jo part hmara password ki length ko show krta hai waha bhi 10 aaye
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%";
}

// 2nd Function -> this function will set the indicator, and this function will set the color of the indicator as well as the shadow
// iss function ka kaam bss itna hai ke password ki strength ke hisaab se indicator ka color ho jata hai
function setIndicator(color) {
    // setting the color of the indicator
    indicator.style.backgroundColor = color;

    // shadow on the indicator
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// 3rd Function -> this function will give us the random integers
function getRandomInteger(min, max) {
    // getting a random number from min to max
    // Math.random() function will give a random number between 0 -> 1
    // but we want maximum random number till maximum value, so we multiply it with (max - min)
    // now to avoid the decimal value we use floor() function
    // now this expression give us the value between 0 -> max, but we need it between min -> max, so we subtract min from them
    return Math.floor(Math.random() * (max - min)) + min;
}

// 4th Function -> in this function we call the getRandomInteger() function this will give us the random integer between 0 -> 9
// this is a generic function and it gives us the integer, as well as uppercase and lowercase, also the symbols
function generateRandomNumber() {
    return getRandomInteger(0, 9);
}

// 5th Function -> in this function we call the getRandomInteger() function this will give us the random character between 'a' -> 'z'
function generateLowercase() {
    // we are passing the ASCII value of 'a' and 'z', this is telling us the range
    // and after getting the random ASCII code we are fetching the character from that ASCII value using String.fromCharCode() function
    return String.fromCharCode(getRandomInteger(97, 123));
}

// 6th Function -> in this function we call the getRandomInteger() function this will give us the random character between 'A' -> 'Z'
function generateUppercase() {
    // we are passing the ASCII value of 'A' and 'Z', this is telling us the range
    // and after getting the random ASCII code we are fetching the character from that ASCII value using String.fromCharCode() function
    return String.fromCharCode(getRandomInteger(65, 91));
}

// 6th Function -> this function give us the random symbol
function generateSymbol() {
    // we have a string declared on the top of this JS file
    // now we generate a random number using the above generic function according to the above symbol string length
    const randomNum = getRandomInteger(0, symbols.length);

    // now we return the character from the symbols string that is present at the above randomNum index
    return symbols.charAt(randomNum);
}

// 7th Function -> this function will calculate the strength of the password set the color of the indicator
function calculateStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSymbol = false;

    // check the selected checkboxes
    if(uppercaseCheck.checked) {
        hasUpper = true;
    }
    if(lowercaseCheck.checked) {
        hasLower = true;
    }
    if(numbersCheck.checked) {
        hasNum = true;
    }
    if(symbolsCheck.checked) {
        hasSymbol = true;
    }

    // agr password me uppercase aur lowercase hai and number ya symbol me se kch hai and length >= 8 hai, means password strong hai
    if(hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    }
    // agr password me uppercase ya lowercase me se koi ek hai and number ya symbol me se koi ek hai and length >= 6 hai, means password medium hai
    else if((hasUpper || hasLower) && (hasNum || hasSymbol) && passwordLength >= 6) {
        setIndicator("#ff0");
    }
    // otherwise password weak hai
    else {
        setIndicator("#f00");
    }
}

// 8th Function -> this function will copy the generated password on clipboard using the copy button
// we use navigator.clipboard.writeText() method to copy the password on clipboard, and this method return a Promise
// we know that Promise ya to Resolve hoga ya Reject hoga hoga 
// and here we show the "copied" text after copy the password successfully,
// hum "copied" text ko print tb krenge jb password successfully copy ho jayega, means jb Promise Resolve ho jayega
// it means hum isme Await keyword ka use krenge k jb tk Promise Resolve nahi hota tb tk Wait kro
// and to use Await keyword, we need to make this method "Async"
async function copyContent() {
    // may be password copy krte time koi error aa jaye so that we use Try Catch Block here
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);

        // after copying the text we print "copied" text
        copyMsg.innerText = "copied";
    }
    catch(e) {
        // agr error aaya to hum custom error message show krenge
        copyMsg.innerText = "Failed";
    }

    // we see that copied wala content sirf kch time ke liye aata hai fir invisible ho jata hai
    // niche wala part CSS se control hoga, and this is to make copy wala span visible
    copyMsg.classList.add("active");

    // and this copied text is visible only for 2 second,
    // so we can use setTimeout here
    setTimeout(function() {
        copyMsg.classList.remove("active");
    }, 2000);
}

// 9th Function -> this function will shuffle the generated password
function shufflePassword(array) {
    // for shuffling we have an algorithm, named Fisher Yates Method
    // hum kisi array ke uparr iss method ko apply krke uss array ko shuffle krr skte hai
    // starting from last index
    for(let i = array.length - 1; i > 0; i--) {
        // finding the random index 'j'
        const j = Math.floor(Math.random() * (i + 1));
        // swapping 'j' with 'i' index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    // after successfully shuffling the array we transfer the array elements into the string
    let str = "";
    array.forEach((el) => (str += el));
    // at the end returning the created shuffled password string 
    return str;
}


// --> CREATING EVENT LISTENERS TO HANDLE THE EVENTS
// jb bhi hmara slider slide hota hai to uparr password ki length bhi change hoti hai
// to hum apne slider pe event listener lga skte hai
// and usme hua kya krenge k passwordLength ko slider ki value ke equal krdenge
// and then uss value ko show krne ke liye hum handleSlider() function ko call krdenge
inputSlider.addEventListener('input', function(e) {
    passwordLength = e.target.value;
    handleSlider();
});

// now we add event listener on the copy button we have
// that when someone clicks on a button then only we copy the content
copyBtn.addEventListener('click', function() {
    // but we only copy the content only if password input field has someone to copy
    // so we check if passwordDisplay value has a true value
    // then we call copyContent() function
    if(passwordDisplay.value) {
        copyContent();
    }
});

// now as we know that if no checkbox is selected we cant generate the password
// it means we have to track the count of the selected checkboxes
// and to do so we have to add event listener on every checkbox
// we have a variable in which all checkboxes are stored
// so we apply a loop on that, and on every checkbox we apply event listener
allCheckbox.forEach((checkbox) => {
    // jaise hi kisi checkbox pe change hota "tick ya un-tick", we call handleCheckBoxChange() function
    checkbox.addEventListener('change', handleCheckBoxChange);
});

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckbox.forEach((checkbox) => {
        if(checkbox.checked) {
            checkCount++;
        }
    });

    // special condition
    // agr hmare 4 ke 4 checkboxes selected hai
    // it means password at least 4 length ka hoga
    // iss case me agr koi user password ki length ko 1 ya 2 krr deta hai
    // to password ki length automatically 4 ho jayegi to uske liye hme condition lagani pdegi
    if(passwordLength < checkCount) {
        passwordLength = checkCount;

        // sath hi handleSlider() function ko call krna pdega
        // so that hum UI me bhi changes ko reflect krr paye
        handleSlider();
    }
}

// now we add event listener on generate password button
// when someone click on generate password button
// then we create a password and show it to user in password display field
generateBtn.addEventListener('click', function() {
    // agr 4ro me se koi bhi checkbox selected nahi hai to password generate hi nahi hoga
    if(checkCount <= 0) {
        return;
    }

    // and one more thing that
    // agr password ki length check count se kamm hai to pehle password ki length update hogi
    // parallelly handleSlider() function bhi call hoga
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // now we generate the actual password
    // jaise hi new password generate hoga to usse pehle old password ko remove krna pdega
    password = "";

    // let suppose user ne 3 checkbox select kiye
    // to humko unn checkboxes ke data ko to password me consider krna hi pdega
    // for example:- agr user ne bola ke password me Uppercase add krdo to Uppercase to usme hoga hi hoga
    // lekin agr user ne password ki length 10 set krdi and saare checkboxes select krdiye 
    // to uss hisaab se humko 4 characters ke baad randomly characters add krne pdege
    // uske liye hmare paas ek array me saare checkboxes ke functions added hone chahiye
    // so that hum Randomly usme se function ko call krr paye
    let funcArr = [];

    // agr uppercase wala checkbox selected hai to array me uppercase wala function push krdenge
    if(uppercaseCheck.checked) {
        funcArr.push(generateUppercase);
    }

    // agr uppercase wala checkbox selected hai to array me uppercase wala function push krdenge
    if(lowercaseCheck.checked) {
        funcArr.push(generateLowercase);
    }

    // agr uppercase wala checkbox selected hai to array me uppercase wala function push krdenge
    if(numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
    }

    // agr uppercase wala checkbox selected hai to array me uppercase wala function push krdenge
    if(symbolsCheck.checked) {
        funcArr.push(generateSymbol);
    }

    // now from the above lines hmare paas wo saare function array me aa gaye jo user ne selected rkhe te
    // ab hum loop ka use krke functions ko call krenge
    for(let i = 0; i < funcArr.length; i++) {
        // function call krke characters ko password me add krdiya
        password += funcArr[i]();
    }

    // ab password ki jitni length remaining bachi hai unn sbko complete krne ke liye firse functions ko call krenge randomly
    // "passwordLength - funcArr.length" krne se hmare remaining characters ka count nikal jayega
    for(let i = 0; i < passwordLength - funcArr.length; i++) {
        let randomIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randomIndex]();
    }

    // password generate hone ke baad hme saare password ko shuffle bhi krna pdega, i.e., saare characters ko yaha waha fekna pdega
    // for shuffling we have an algorithm, named Fisher Yates Method
    // hum kisi array ke uparr iss method ko apply krke uss array ko shuffle krr skte hai
    // so password ko shuffle krne ke liye hum password ko array ko form me send krenge so that shuffling easy ho
    password = shufflePassword(Array.from(password));

    // now the last step is to display the generated password in UI
    passwordDisplay.value = password;

    // ab jb password bn gaya to user ko uss password ki strength bhi show krni pdegi
    // uske liye calculateStrength() function bhi call krna pdega
    calculateStrength();
}); 
const form = document.getElementById('forms')
const explaination = document.getElementById('explaination') 
const code = document.getElementById('code') 

function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        
        element.textContent += '.';

        
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}


const handleSubmit = async (e) => {
    e.preventDefault()

    // const data = new FormData();
    // data.append("input" , code.value);
    let codeprompt = code.value;

    loader(explaination)
   
   
   
   const response =  await fetch('https://explainmycode.up.railway.app/', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
            prompt: codeprompt
        })
       });
       clearInterval(loadInterval)
       explaination.innerHTML = " "
       console.log(`${prompt}`)
       
       if (response.ok) {
           const data = await response.json();
          const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 
           typeText(explaination, parsedData)
       } else {
           const err = await response.text()
       
           explaination.innerHTML = "Something went wrong"
           alert(err)
       }

}



    form.addEventListener('submit', handleSubmit)
    form.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e)
        }
    })
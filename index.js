const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector("button"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
heartBtn = document.querySelector(".heart")
synth = speechSynthesis;


function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote";
    fetch("https://programming-quotes-api.herokuapp.com/quotes/random")
    .then(response => response.json())
    .then(result => {
        quoteText.innerText = result.en;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "Get New Quote";
    });
}

speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://medium.com/intent/medium?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

heartBtn.addEventListener('click', function onclick(){
    heartBtn.style.backgroundColor = "white"
    heartBtn.style.color = "red"
    console.log('you love this')
})

quoteBtn.addEventListener("click", randomQuote);
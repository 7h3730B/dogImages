window.onload = () => {
    async function update() {
        let images = document.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
            if (images[i].hasDogImage) { continue; }
            images[i].hasDogImage = true;
            // TODO: Set Image url to a random dog image! 
            let response = await fetch('https://dog.ceo/api/breeds/image/random');

            let dog = images[i].src;
            if (response.ok) {
                dog = await response.json();
                dog = dog['message'];
            }

            console.log(dog);
            images[i].src = dog;
            console.log(dog);
        };
    }
    update();
    setInterval(update, 1000);
};
let cache = [];

function getCache(callback) {
    chrome.storage.local.get(['cache', 'cacheTime'], data => {
        if (data['cache'] && (data['cacheTime'] > Date.now() - 3600 * 1000)) { // Not older than 1 hour
            cache = data['cache'];
        }
        return callback();
    });
}

window.onload = () => {
    async function update() {
        let images = document.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
            if (images[i].hasDogImage) { continue; }
            images[i].hasDogImage = true;
            let dog = images[i].src;
            if (cache.length < 100) {
                let response = await fetch('https://dog.ceo/api/breeds/image/random');

                if (response.ok) {
                    dog = await response.json();
                    dog = dog['message'];
                    cache.push(dog);
                    chrome.storage.local.set({ cache: cache, cacheTime: Date.now() });
                }
            } else {
                dog = cache[Math.floor(Math.random() * cache.length)];
            }
            images[i].src = dog;
            console.log(cache.length);
        }
        setTimeout(update, 1000);
    }
    getCache(update); 
}
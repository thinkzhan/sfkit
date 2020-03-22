export default function download(url) {
    try {
        const elemIF = document.createElement('iframe');
        elemIF.src = url;
        elemIF.style.display = 'none';
        document.body.appendChild(elemIF);
    } catch (e) {
        window.open(url);
    }
}

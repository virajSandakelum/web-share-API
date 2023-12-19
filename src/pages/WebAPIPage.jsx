import React, { useRef } from 'react';
import { toPng } from 'html-to-image';


const WebAPIPage = () => {

    const abcRef = useRef(null);

    const share = async () => {
        try {
            const dataUrl = await toPng(abcRef.current, { cacheBust: false });
            const blob = dataURLtoBlob(dataUrl);
            const file = new File([blob], 'payment-summary.png', { type: 'image/png' });
    
            if ('share' in navigator) {
                const shareData = {
                    files: [file],
                    title: 'Jabberwocky',
                    text: 'Check out this great poem about a Jabberwocky.',
                    url: 'https://en.wikipedia.org/wiki/Jabberwocky',
                };
    
                await navigator.share(shareData);
                console.log('Thanks for sharing!');
            } else {
                alert("Sharing is not supported on this browser.");
            }
        } catch (err) {
            console.error(err);
        }
    };


    const dataURLtoBlob = (dataUrl) => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };



    return (
        <div ref={abcRef}>

            <button onClick={share}>Shgggare</button>

        </div>
    )
}

export default WebAPIPage
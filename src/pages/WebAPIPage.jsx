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
                    title: 'Payment Summary',
                    text: 'Check out this payment summary!',
                };
                await navigator.share(shareData);
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

            <button onClick={share}>Share Button</button>

        </div>
    )
}

export default WebAPIPage
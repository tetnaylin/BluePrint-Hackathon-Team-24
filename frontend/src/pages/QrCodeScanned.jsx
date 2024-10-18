import React from 'react'
import QrCodeScanned from '../components/qr-code-scanned/QrCodeScanned'
import '../App.css';
const FormSubmitted = () => {
    document.body.className="background";
    return (
        <div className='background'>
        <QrCodeScanned/>
        </div>
    )
    }

    export default QrCodeScanned
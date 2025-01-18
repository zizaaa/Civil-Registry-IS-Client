import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { recaptcha_key } from '../hooks/imports';

interface ReCaptchaProps {
    verifyCaptcha: (value: string | null) => void;
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({ verifyCaptcha }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h1 className="text-center text-gray-700 text-xl">
                    Please verify that you're a human to proceed.
                </h1>

                <div className="flex justify-center">
                    <ReCAPTCHA
                        sitekey={recaptcha_key}
                        onChange={verifyCaptcha}
                        className="mt-4"
                    />
                </div>
            </div>
        </div>
    );
};

export default ReCaptcha;
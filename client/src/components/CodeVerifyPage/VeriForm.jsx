import React, { useRef, useState, useEffect } from 'react'

const VeriForm = ({ onSubmit }) => {
    const firstInput = useRef();
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState();

    useEffect(() => {
        firstInput.current.focus();
    }, []);

    const onChange = (e, index) => {
        const currentInput = e.target;
        const nextInput = currentInput.nextElementSibling;
        const value = e.target.value;

        // Update the verification code state
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        if (currentInput.value.length > 1) {
            currentInput.value = "";
        }

        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
            nextInput.removeAttribute("disabled");
            nextInput.focus();
        }
    }

    const onKeyDown = (e, index) => {
        const currentInput = e.target;
        const prevInput = currentInput.previousElementSibling;

        if (e.key === "Backspace" && prevInput) {
            currentInput.value = "";
            const newCode = [...verificationCode];
            newCode[index] = "";
            setVerificationCode(newCode);
            currentInput.setAttribute("disabled", true);
            prevInput.focus();
        }
    }

    const handleFocus = () => {
        setError(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = verificationCode.join('');

        if (code.length < 6) {
            setError("You need to fill 6 number");
            return;
        }

        onSubmit(code);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex gap-1 mx-auto w-fit mb-4'>
                <input ref={firstInput} className='w-[50px] h-[50px] outline-none text-center border rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type='number' onChange={(e) => onChange(e, 0)} onKeyDown={(e) => onKeyDown(e, 0)} onFocus={handleFocus} />
                <input className='w-[50px] h-[50px] outline-none text-center border rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type='number' disabled onChange={(e) => onChange(e, 1)} onKeyDown={(e) => onKeyDown(e, 1)} onFocus={handleFocus} />
                <input className='w-[50px] h-[50px] outline-none text-center border rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type='number' disabled onChange={(e) => onChange(e, 2)} onKeyDown={(e) => onKeyDown(e, 2)} onFocus={handleFocus} />
                <input className='w-[50px] h-[50px] outline-none text-center border rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type='number' disabled onChange={(e) => onChange(e, 3)} onKeyDown={(e) => onKeyDown(e, 3)} onFocus={handleFocus} />
                <input className='w-[50px] h-[50px] outline-none text-center border rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type='number' disabled onChange={(e) => onChange(e, 4)} onKeyDown={(e) => onKeyDown(e, 4)} onFocus={handleFocus} />
                <input className='w-[50px] h-[50px] outline-none text-center border rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type='number' disabled onChange={(e) => onChange(e, 5)} onKeyDown={(e) => onKeyDown(e, 5)} onFocus={handleFocus} />
            </div>
            <button type="submit" className='block bg-[#1DA599] w-[80%] mx-auto py-2 text-white rounded-md mb-4'>Verify</button>
            {error && <p className='text-red-600 mb-2'>{error}</p>}
        </form>
    )
}

export default VeriForm 
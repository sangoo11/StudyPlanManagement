import React, { useEffect } from 'react';

const AccountInfoInput = ({ isEditing = false, children, name, value }) => {
    let content = <span className='p-2' id={name}>{value}</span>

    if (isEditing) {
        content = <input className='p-2 bg-orange-100 border border-orange-200 rounded-md' id={name} name={name} defaultValue={value} />
    }

    return (
        <div className={'flex items-center'}>
            <label className={'w-[15ch]'} htmlFor={name}>{children}</label>
            {content}
        </div>
    );
};

export default AccountInfoInput;

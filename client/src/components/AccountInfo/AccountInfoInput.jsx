import React from 'react';

const AccountInfoInput = ({isEditing, children, name, value}) => {
    let Tag = "span";

    if (isEditing) {
        Tag = "input";
    }

    return (
        <div className={'flex items-center'}>
            <label className={'w-[15ch]'} htmlFor={name}>{children}</label>
            <Tag id={name}>: {value}</Tag>
        </div>
    );
};

export default AccountInfoInput;

import React from 'react';
import { useSelector } from 'react-redux';
import { WarningText, MainText } from '../../common/text';
import { Input } from '../../common';
import { fonts } from '../../../utils';
import { ToInputInterface } from '../types';
import { VerticalContentDiv } from '../../common/wrapper/index';

const ToInput: React.FunctionComponent<ToInputInterface> = ({
    errorMessages,
    onChange,
    isCorrect,
    receiverAddress,
}) => {
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

    const receiverAddressInput = {
        value: receiverAddress,
        onChange,
        placeholder: 'Enter wallet address',
        type: 'text',
    };

    const warningTextInlineStyle = {
        marginTop: '4px',
        marginLeft: '0.3rem',
    };

    return (
        <VerticalContentDiv mb="10px">
            <MainText className={mainHeadingfontFamilyClass}>To</MainText>
            {/* <StyledInput id="to-address" {...styledInput} /> */}
            <Input id="username" {...receiverAddressInput} />
            <div style={{ height: '1rem' }}>
                {!isCorrect && (
                    <WarningText
                        id="warning-text-1"
                        className={subHeadingfontFamilyClass}
                        style={warningTextInlineStyle}
                        visibility={!isCorrect}
                    >
                        {errorMessages.invalidAddress}
                    </WarningText>
                )}
            </div>
        </VerticalContentDiv>
    );
};

export default ToInput;
import React from 'react';
import { Props } from './types';
import { HorizontalContentDiv, VerticalContentDiv } from '../wrapper';
import { MainText } from '../text';
import {
    TxCardSubWrapper,
    TxCardWrapper,
    TxDateRow,
    TxHorizontalContentDiv,
} from './styles';
import { fonts, colors, helpers, images } from '../../../utils';

const { greenCheck } = images;

const TxCardView: React.FunctionComponent<Props> = (props) => {
    const { operation, status, coin, amount, handleClick, timestamp } = props;
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
    const { green, red } = colors;
    const { trimBalance, dateFormatter } = helpers;

    return (
        <TxCardWrapper
            id="tx-card-wrapper"
            style={{ cursor: 'pointer' }}
            onClick={() => handleClick()}
        >
            <TxDateRow className={mainHeadingfontFamilyClass}>
                {`${dateFormatter(timestamp)} (+UTC)`}
            </TxDateRow>
            <TxCardSubWrapper>
                <HorizontalContentDiv>
                    <div style={{ marginLeft: 10 }}>
                        <VerticalContentDiv>
                            <MainText
                                id="operation-coin"
                                className={mainHeadingfontFamilyClass}
                                fontSize="18px"
                            >{`${operation}`}</MainText>
                            <TxHorizontalContentDiv>
                                <MainText
                                    id="status"
                                    className={subHeadingfontFamilyClass}
                                    color={
                                        status === 'Failed' ? red : '#02CC53'
                                    }
                                    fontSize="12px"
                                >
                                    <img
                                        src={greenCheck}
                                        alt="green check"
                                        style={{ marginRight: 8 }}
                                    />
                                    {status}
                                </MainText>
                            </TxHorizontalContentDiv>
                        </VerticalContentDiv>
                    </div>
                </HorizontalContentDiv>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: '40%',
                        paddingLeft: 10,
                        alignItems: 'center',
                        marginRight: '0.45rem',
                    }}
                >
                    <VerticalContentDiv>
                        <MainText
                            className={mainHeadingfontFamilyClass}
                            balOverFlow
                            fontSize="18px"
                            fontWeight="600"
                            textAlign="end"
                            color="#2E9B9B"
                        >
                            {`${trimBalance(Number(amount))} ${coin}`}
                        </MainText>
                    </VerticalContentDiv>
                </div>
            </TxCardSubWrapper>
        </TxCardWrapper>
    );
};

export default TxCardView;
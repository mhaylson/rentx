import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

interface DateValueProps {
    selected: boolean;
}

export const Container = styled.View`
     flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 40%;

    /* align-items: center; */
    justify-content: center;
    

    background-color: ${({ theme }) => theme.colors.shape_dark};
    padding: 20px;
    padding-top: ${getStatusBarHeight() + 30}px;

`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(25)}px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};

    margin-top: 24px;
`;

export const RentalPeriod = styled.View`
    margin: 32px 0px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
`;

export const DateInfo = styled.View`
    width: 30%;
`;

export const DateTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    font-size: ${RFValue(10)}px;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 9px;
`;

export const DateValue = styled.Text<DateValueProps>`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.shape};

    ${({ selected }) => !selected && css`
        border-bottom-width: 1px;
        border-bottom-color: ${({ theme }) => theme.colors.text};

    `}
`;

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {
        paddingBottom: 24
    },
    showScrollVerticalIndicator: false
})``;

export const Footer = styled.View`
    background-color: ${({ theme }) => theme.colors.backgorund_secondary};
     width: 100%;
     align-items: center;
     justify-content: center;
     padding: 24px 24px ${getBottomSpace() + 24}px;
`;
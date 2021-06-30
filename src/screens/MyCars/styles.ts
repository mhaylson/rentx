import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
     flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 273px;

    /* align-items: center; */
    justify-content: center;
    

    background-color: ${({ theme }) => theme.colors.shape_dark};
    padding: 25px;
    padding-top: ${getStatusBarHeight() + 30}px;

`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(30)}px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};

    margin-top: 24px;
`;

export const SubTitle = styled.Text`
color: ${({ theme }) => theme.colors.shape};
font-size: ${RFValue(15)}px;
font-family: ${({ theme }) => theme.fonts.secondary_400};

margin-top: 24px;
`;

export const Content = styled.View`
     flex: 1;
     width: 100%;
     padding: 0 16px;
`;

export const Appointments = styled.View`
     width: 100%;
     flex-direction: row;
     align-items: center;
     justify-content: space-between;
     padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
     color: ${({ theme }) => theme.colors.text};
     font-size: ${RFValue(15)}px;
     font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const AppointmentsQuantity = styled.Text`
     color: ${({ theme }) => theme.colors.title};
     font-size: ${RFValue(15)}px;
     font-family: ${({ theme }) => theme.fonts.secondary_500};
`;

export const CarWrapper = styled.View`
`;

export const CarFooter = styled.View`
     flex-direction: row;
     height: 40px;
     margin-top: -14px;
     margin-bottom: 16px;
     padding: 15px 24px;

     align-items: center;
     justify-content: space-between;

     background-color: ${({ theme }) => theme.colors.backgorund_secondary};
`;

export const CarFooterTitle = styled.Text`
     font-family: ${({ theme }) => theme.fonts.secondary_500};
     color: ${({ theme }) => theme.colors.text_detail};
     font-size: ${RFValue(10)}px;

     text-transform: uppercase;
`;

export const CarFooterPeriod = styled.View`
     flex-direction: row;
     align-items: center;
`;

export const CarFooterDate = styled.Text`
     font-family: ${({ theme }) => theme.fonts.primary_400};
     color: ${({ theme }) => theme.colors.title};
     font-size: ${RFValue(13)}px;
`;



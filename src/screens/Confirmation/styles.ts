import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
     flex: 1;
     padding-top: 96px;
     background-color: ${({ theme }) => theme.colors.header};
`;

export const Content = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
     font-family: ${({ theme }) => theme.fonts.secondary_500};
     font-size: ${RFValue(30)}px;
     color: ${({ theme }) => theme.colors.shape};
     margin-top: 40px;
`;

export const Message = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.text_detail};

    margin-top: 16px;
    line-height: ${RFValue(25)}px;
    text-align: center;
`;

export const Footer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    margin: 80px 0px;
`;

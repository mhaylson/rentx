import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
     flex: 1;
     background-color: ${({ theme }) => theme.colors.backgorund_secondary};
`;

export const Header = styled.View`
     flex-direction: row;
     justify-content: space-between;
     align-items: center;

     position: absolute;
     margin-top: ${getStatusBarHeight() + 18}px;
     margin-left: 24px;
`;

export const CarImages = styled.View`
     margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Details = styled.View`
     width: 100%;
     flex-direction: row;
     align-items: center;
     justify-content: space-between;
`;

export const Description = styled.View`
`;

export const Brand = styled.Text`
     font-family: ${({ theme }) => theme.fonts.secondary_500};
     font-size: ${RFValue(10)}px;
     color: ${({ theme }) => theme.colors.text_detail};
     text-transform: uppercase;
`;

export const Name = styled.Text`
     font-family: ${({ theme }) => theme.fonts.secondary_500};
     font-size: ${RFValue(25)}px;
     color: ${({ theme }) => theme.colors.title};
     text-transform: capitalize;
`;

export const Rent = styled.View``;

export const Period = styled.Text`
     font-family: ${({ theme }) => theme.fonts.secondary_500};
     font-size: ${RFValue(10)}px;
     color: ${({ theme }) => theme.colors.text_detail};
     text-transform: uppercase;
`;

export const Price = styled.Text`
     font-family: ${({ theme }) => theme.fonts.secondary_500};
     font-size: ${RFValue(25)}px;
     color: ${({ theme }) => theme.colors.main};
     text-transform: uppercase;
`;

export const About = styled.Text`
          font-family: ${({ theme }) => theme.fonts.secondary_400};
     font-size: ${RFValue(15)}px;
     color: ${({ theme }) => theme.colors.text};

     text-align: justify;
     margin-top: 16px;
     line-height: ${RFValue(25)}px;
`;

export const Accessories = styled.View`
     width: 100%;
     flex-direction: row;

     flex-wrap: wrap;
     align-items: center;
     justify-content: space-between;
     margin-top: 16px;
`;

export const Footer = styled.View`
     background-color: ${({ theme }) => theme.colors.backgorund_secondary};
     width: 100%;
     align-items: center;
     justify-content: center;
     padding: 24px 24px ${getBottomSpace() + 24}px;
`;

export const OfflineInfo = styled.Text`
     font-family: ${({ theme }) => theme.fonts.secondary_400};
     font-size: ${RFValue(10)}px;
     color: ${({ theme }) => theme.colors.main};

     text-align: center;
`;
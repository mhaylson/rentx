import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../database/model/Car';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const HeaderContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 32px 24px;
`;

export const Header = styled.View`
    width: 100%;
    height: 113px;
    background-color: ${({ theme }) => theme.colors.shape_dark};

    justify-content: flex-end;
`;

export const TotalCars = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(15)}px;
`;


export const CarList = styled(FlatList as new () => FlatList<Car>).attrs({
    contentContainerStyle: {
        padding: 24
    },
    showVerticalScrollIndicator: false
}
)``;
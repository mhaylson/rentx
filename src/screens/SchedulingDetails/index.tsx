import React, { useState, useEffect } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { RFValue } from 'react-native-responsive-fontsize';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth'
import { useTheme } from 'styled-components';


import {
    Container,
    Header,
    CarImages,
    Content,
    Description,
    Details,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    TotalContent,
    TotalDetail,
    TotalTitle,
    TotalValue,
    Total
} from './styles';
import { useNetInfo } from '@react-native-community/netinfo';

interface Params {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    start: string;
    end: string;
}


export function SchedulingDetails() {
    const [rentalPeriod, setRendalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const [loading, setLoading] = useState(false);
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

    const netInfo = useNetInfo();
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { car, dates } = route.params as Params;
    const rentTotal = car.price * dates.length;
    const { user } = useAuth();

    async function handleSchedulingConfirm() {

        setLoading(true);

        await api.post('rentals', {
            user_id: user.id,
            car_id: car.id,
            start_date: new Date(dates[0]),
            end_date: new Date(dates[dates.length - 1]),
            total: rentTotal
        })
            .then(() => {
                navigation.navigate('Confirmation', {
                    title: 'Carro alugado!',
                    message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
                    nextScreenRoute: 'Home'
                })
            })
            .catch(() => {
                setLoading(false);
                Alert.alert('Não foi possível confirmar o agendamento!')
            });
    }

    useEffect(() => {
        setRendalPeriod({
            start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    }, []);

    useEffect(() => {
        async function fetchCarUpdated() {
            const response = await api.get(`/cars/${car.id}`);
            setCarUpdated(response.data);
        }

        if (netInfo.isConnected === true) {
            fetchCarUpdated();
        }
    }, [netInfo.isConnected]);

    return (
        <Container>
            <StatusBar
                barStyle='dark-content'
                backgroundColor='transparent'
                translucent
            />
            <Header>
                <BackButton onPress={() => { }} />
            </Header>
            <CarImages>
                <ImageSlider
                    imagesUrl={
                        !!carUpdated.photos ?
                            carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                    }
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
                    </Rent>
                </Details>
                {
                    carUpdated.accessories &&
                    <Accessories>
                        {
                            carUpdated.accessories.map(accessory => (
                                <Accessory
                                    key={accessory.type}
                                    name={accessory.name}
                                    icon={getAccessoryIcon(accessory.type)}
                                />
                            ))
                        }
                    </Accessories>
                }

                <RentalPeriod>

                    <CalendarIcon>
                        <Feather
                            name='calendar'
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather
                        name='chevron-right'
                        size={RFValue(16)}
                        color={theme.colors.text_detail}
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <TotalContent>
                    <TotalTitle>TOTAL</TotalTitle>
                    <TotalDetail>
                        <TotalValue>{`R$ ${car.price} x ${dates.length} diárias`}</TotalValue>
                        <Total>R$ {rentTotal}</Total>
                    </TotalDetail>
                </TotalContent>
            </Content >

            <Footer>
                <Button
                    title='Alugar agora'
                    color={theme.colors.success}
                    onPress={handleSchedulingConfirm}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>

        </Container >
    );
}
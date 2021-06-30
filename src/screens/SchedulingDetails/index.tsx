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

    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { car, dates } = route.params as Params;
    const rentTotal = car.price * dates.length;

    async function handleSchedulingConfirm() {

        setLoading(true);

        const response = await api.get(`/schedules_bycars/${car.id}`);

        const unavailable_dates = [
            ...response.data.unavailable_dates,
            ...dates
        ];

        await api.post(`schedules_byuser`, {
            user_id: 1,
            car,
            startDate: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
        });

        const info = {
            title: 'Carro alugado!',
            subTitle: `Agora você só precisa ir{'\n'}
            até a concessionária da RENTX{'\n'}
            pegar o seu automóvel.`
        }

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        })
            .then(() => navigation.navigate('Confirmation', {
                title: 'Carro alugado!',
                message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
                nextScreenRoute: 'Home'
            }))
            .catch(() => {
                Alert.alert('Não foi possível confirmar o agendamento!')
                setLoading(false);
            });
    }

    useEffect(() => {
        setRendalPeriod({
            start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    }, []);

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
                    imagesUrl={car.photos}
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
                <Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
                        ))
                    }
                </Accessories>

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
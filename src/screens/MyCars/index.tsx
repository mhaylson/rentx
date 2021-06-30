import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';
import { useTheme } from 'styled-components';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';
import { CarCard } from '../../components/CarCard';

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}

export function MyCars() {

    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        async function fetchCars() {

            try {
                const response = await api.get('/schedules_byuser/?user_id=1');
                console.log(response.data);
                setCars(response.data);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle='light-content'
                backgroundColor='transparent'
                translucent={true}
            />
            <Header>
                <BackButton color={theme.colors.shape} onPress={() => { }} />
                <Title>
                    Seus agendamentos,{`\n`}estão aqui.
                </Title>

                <SubTitle>Conforto, segurança e praticidade.</SubTitle>
            </Header>

            {loading ? <LoadAnimation /> :
                <Content>
                    <Appointments>
                        <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Appointments>
                    <FlatList
                        data={cars}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CarWrapper>
                                <CarCard data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>PERÍODO</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.startDate}</CarFooterDate>
                                        <AntDesign
                                            name='arrowright'
                                            size={14}
                                            color={theme.colors.text_detail}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
                                    </CarFooterPeriod>

                                </CarFooter>
                            </CarWrapper>
                        )}

                    />
                </Content>
            }
        </Container>
    );
}
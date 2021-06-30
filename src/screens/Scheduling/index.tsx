import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { format } from 'date-fns';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
    Calendar,
    MarkedDateProps,
    DayProps,
    generateInterval
} from '../../components/Calendar';
import { useTheme } from 'styled-components';
import { CarDTO } from '../../dtos/CarDTO';

import ArrowSvg from '../../assets/arrow.svg'

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer
} from './styles';
import { getPlataformDate } from '../../utils/getPlataformDate';

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params {
    car: CarDTO;
}

export function Scheduling() {
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDate, setMarkedDate] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const theme = useTheme();

    const navigation = useNavigation();

    const route = useRoute();
    const { car } = route.params as Params;

    function handleSchedulingDetails() {

        navigation.navigate('SchedulingDetails', {
            car,
            dates: Object.keys(markedDate)
        })

    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        console.log(interval);
        setMarkedDate(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy'),
        });
    }

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
                    Escolha uma{`\n`}
                    data de início e{`\n`}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted}>
                            {rentalPeriod.startFormatted}
                        </DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDate}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button title={'Confirmar'} onPress={handleSchedulingDetails} enabled={!!rentalPeriod.startFormatted} />
            </Footer>
        </Container>
    );
}
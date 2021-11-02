import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring
} from 'react-native-reanimated';
const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';
import { LoadAnimation } from '../../components/LoadAnimation';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Ionicons } from '@expo/vector-icons';
import {
    Container,
    HeaderContent,
    Header,
    TotalCars,
    CarList
} from './styles';

export function Home() {

    const [cars, setCars] = useState<CarDTO[]>();
    const [isLoading, setIsLoading] = useState(true);

    const theme = useTheme();
    const navigation = useNavigation();

    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);


    const buttonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        }
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(event, ctx: any) {
            ctx.positionX = event.translationX;
            ctx.positionY = event.translationY;

        },
        onActive(event, ctx: any) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() {
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        }
    });


    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car });
    }

    function handleMyCars() {
        navigation.navigate('MyCars');
    }

    useEffect(() => {

        let isMounted = true;

        async function loadCars() {

            try {
                const response = await api.get('/cars');

                if (isMounted) {
                    setCars(response.data);
                }

            } catch (error) {
                console.log('Erro');
            }

            if (isMounted) {
                setIsLoading(false);
            }
        }

        loadCars();

        return () => {
            isMounted = false;
        }
    }, []);

    // useEffect(() => {

    //     BackHandler.addEventListener('hardwareBackPress', () => {
    //         return true;
    //     })
    // }, []);

    return (
        < Container >
            <StatusBar
                barStyle='light-content'
                backgroundColor='transparent'
                translucent={true}
            />
            {
                isLoading ? <LoadAnimation />
                    :
                    <>
                        <Header>
                            <HeaderContent>
                                <Logo
                                    width={RFValue(108)}
                                    height={RFValue(12)}
                                />
                                {
                                    isLoading &&
                                    <TotalCars>
                                        {`Total de ${cars?.length} carros`}
                                    </TotalCars>
                                }

                            </HeaderContent>
                        </Header>

                        <CarList
                            data={cars}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <CarCard data={item} onPress={() => handleCarDetails(item)} />}
                        />
                    </>
            }

            {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[
                        buttonAnimatedStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22
                        }
                    ]}
                >

                    <ButtonAnimated
                        style={[styles.button, { backgroundColor: theme.colors.main }]}
                        onPress={handleMyCars}
                    >

                        <Ionicons
                            name='ios-car-sport'
                            size={32}
                            color={theme.colors.backgorund_secondary}
                        />

                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler> */}


        </Container >
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
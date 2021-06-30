import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import { useTheme } from 'styled-components';
import { api } from '../../../services/api';

import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle,
} from './styles';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}

export function SignUpSecondStep() {
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme();

    const route = useRoute();
    const { user } = route.params as Params;
    const navigation = useNavigation();

    async function handleRegister() {
        if (!password || !passwordRepeat) {
            return Alert.alert('Informe a senha e a confirmação')
        }

        if (password !== passwordRepeat) {
            return Alert.alert('As senhas não são iguais')
        }

        setIsLoading(true);

        await api.post('/users', {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password
        }).then(() => {
            navigation.navigate('Confirmation', {
                title: 'Conta criada!',
                message: 'Agora é só fazer o login\ne aproveitar!',
                nextScreenRoute: 'SignIn'
            });
        }).catch((error) => {
            Alert.alert('Opa', 'Erro ao cadastrar!');
        }).finally(() => {
            setIsLoading(false);
        })


    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <Container>
                    <Header>
                        <BackButton />
                        <Steps>
                            <Bullet />
                            <Bullet active />
                        </Steps>
                    </Header>
                    <Title>
                        Crie sua{`\n`}
                        conta
                    </Title>
                    <SubTitle>
                        Faça seu cadastro de{`\n`}
                        forma rápida e fácil.
                    </SubTitle>
                    <Form>
                        <FormTitle>
                            1. Dados
                        </FormTitle>
                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />
                        <PasswordInput
                            iconName='lock'
                            placeholder='Repetir senha'
                            onChangeText={setPasswordRepeat}
                            value={passwordRepeat}
                        />
                    </Form>
                    <Button
                        title='Próximo'
                        enabled={true}
                        color={theme.colors.success}
                        onPress={handleRegister}
                        loading={isLoading}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
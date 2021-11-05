import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
    Container,
    IconContainer,
    InputText
} from './styles';
import { } from 'react-native';

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name']
}

export function PasswordInput({
    iconName,
    value,
    ...rest
}: Props) {

    const [isVisiblePassword, setIsVisiblePassword] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const theme = useTheme();

    function handleInputFocused() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    }


    function handleVisiblePassword() {
        setIsVisiblePassword(prevState => !prevState);
    }

    return (
        <Container>
            <IconContainer isFocused={isFocused}>

                <Feather
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>
            <InputText
                isFocused={isFocused}
                secureTextEntry={isVisiblePassword}
                onFocus={handleInputFocused}
                onBlur={handleInputBlur}
                autoCorrect={false}
                {...rest}
            />
            <BorderlessButton onPress={handleVisiblePassword}>
                <IconContainer isFocused={isFocused}>
                    <Feather
                        name={isVisiblePassword ? 'eye' : 'eye-off'}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconContainer>
            </BorderlessButton>
        </Container>
    );
}
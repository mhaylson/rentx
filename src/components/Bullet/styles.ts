import styled from 'styled-components/native';

interface ImageProps {
    active: boolean;
}

export const Container = styled.View<ImageProps>`
    height: 6px;
    width: 6px;
    background-color: ${({ theme, active }) =>
        active ? theme.colors.title : theme.colors.shape};

    margin-left: 8px;
    border-radius: 3px;
`;
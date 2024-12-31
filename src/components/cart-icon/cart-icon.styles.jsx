import styled from "styled-components";
import SvgCart from '../../assets/shopping-bag.svg?react';

export const CartIconContainer = styled.div`
    width: 45px;
    height: 45px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const ShoppingIcon = styled(SvgCart)`
    width: 24px;
    height: 24px;
    pointer-events: none; /* Prevent SVG from blocking clicks */
`;

export const ItemCount = styled.span`
    position: absolute;
    font-size: 10px;
    font-weight: bold;
    bottom: 12px;
`;
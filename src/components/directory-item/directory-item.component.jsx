import { useNavigate } from 'react-router';
import {
    DirectoryItemContainer,
    BackgroundImage,
    Body,
    Title,
    Subtitle,
} from './directory-item.styles';

const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);
    return (
        <DirectoryItemContainer onClick={() => onNavigateHandler(route)}>
            <BackgroundImage $imageUrl={imageUrl} />
            <Body>
                <Title>{title}</Title>
                <Subtitle>Shop Now</Subtitle>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;

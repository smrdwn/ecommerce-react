import {
    Group,
    FormInputField,
    FormInputLabel,
} from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <FormInputField {...otherProps} />
            {label && (
                <FormInputLabel
                    shrink={otherProps.value?.length > 0}
                    htmlFor={otherProps.id || 'form-input'}
                >
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;

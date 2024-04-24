import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>

export const stack: HStack = (props: HStackProps) => {
    return (
        <Flex
            direction='row'
            {...props}
        />
    );
};
export type Mods = Record<string, boolean | string | undefined>;

export const classNames = (
    cls: string = '',
    mods: Mods = {},
    additional?: Array<string | undefined>,
): string => {
    const additionalArr = additional || [];

    return [
        cls,
        ...Object.entries(mods)
            .filter(([, value]) => Boolean(value))
            .map(([className]) => className),
        ...additionalArr.filter(Boolean),
    ].join(' ');
};

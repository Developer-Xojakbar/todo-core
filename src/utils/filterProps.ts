export const filterProps = (props: any) => {
    Object.keys(props).forEach((key: any) => {
        if (props[key] === 'true') props[key] = true;
        if (props[key] === 'false') props[key] = false;
        if (!props[key]) delete props[key];

        if (typeof props[key] !== 'string') return;

        props[key] = {
            contains: props[key],
            mode: 'insensitive',
        };
    });

    return props;
};

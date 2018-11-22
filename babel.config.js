module.exports = api => {
    api.cache(true);

    const presets = [
        require('@babel/preset-env'),
    ];

    const plugins = [];

    return {
        presets,
        plugins,
    };
};

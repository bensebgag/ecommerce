module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
            // ✅ NativeWind’s own Babel preset
            'nativewind/babel',
        ],
        plugins: [
            // ✅ No more NativeWind here
            'react-native-reanimated/plugin',
        ],
    };
};

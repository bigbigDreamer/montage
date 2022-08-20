const getLazyPlugins = (libs = []) => {
    if (Array.isArray(libs)) {
        return libs.map((item) => [
            'import',
            {
                libraryName: item,
                libraryDirectory: 'es',
                style: true,
            },
        ]);
    }

    return [
        [
            'import',
            {
                libraryName: libs,
                libraryDirectory: 'es',
                style: true,
            },
        ],
    ];
};

module.exports.getLazyPlugins = getLazyPlugins;

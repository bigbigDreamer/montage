export enum ErrorLog {
    RouteNoComponent = "Route config property 'component' can't be empty!",
    ChildrenNotAsArray = "Route config property 'children' must be array!",
    LazyRouteNotImportFT = "Lazy route component should use `() => import('xxx')`, Please check your route config file.",
    DefineRouterConfigArgsShouldBeArray = 'Routes should be array!',
    PluginHadExist = 'The plug-in already exists. Do not add it again. This prompt only⚠️ warning effect, the internal system has handled repeated plug-ins！',
}

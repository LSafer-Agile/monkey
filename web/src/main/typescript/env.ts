import path from "path";

export default {
    // Paths
    /**
     * The path to the locales' folder (for i18n).
     */
    LOCALES_PATH: path.join(process.env.BWD!, 'bundle/main/locales'),
    /**
     * The path to the compiled client javascript path.
     * To be served statically.
     */
    CLIENT_JAVASCRIPT_PATH: path.join(process.env.BWD!, 'javascript/client'),
    /**
     * The path to the compiled client css.
     */
    CLIENT_CSS_PATH: path.join(process.env.BWD!, 'css/client'),
    /**
     * The path to the client bundle path.
     * To be served statically.
     */
    CLIENT_BUNDLE_PATH: path.join(process.env.BWD!, 'bundle/client'),
    /**
     * The path to the libs json file.
     */
    LIBS_PATH: path.join(process.env.BWD!, 'bundle/main/libs.json'),
    /**
     * The path to the views.
     */
    VIEWS_PATH: path.join(process.env.BWD!, 'bundle/views'),
}

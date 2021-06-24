// This file taps into the server-side build pipeline.

// Implement the Gatsby onCreatePage API.
// Called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions

    // page.matchPath is a special key thats used for matching pages on the client exclusively.
    if (page.path.match(/^\/account/)) {
        page.matchPath = "/account/*"

        // Update the page
        createPage(page)
    }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /auth0-js/,
                        use: loaders.null(),
                    }
                ]
            }
        })
    }
}
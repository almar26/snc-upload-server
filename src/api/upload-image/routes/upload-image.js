'use strict';

/**
 * upload-image router
 */

// @ts-ignore
const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter("api::upload-image.upload-image");

const customRouter = (innerRouter, extraRoutes = []) => {
    let routes;
    return {
        get prefix() {
            return innerRouter.prefix;
        },
        get routes() {
            if (!routes) routes = innerRouter.routes.concat(extraRoutes);
            return routes;
        }
    }
};

const myExtraRoutes = [
    {
        method: "POST",
        path: "/upload-image/create",
        handler: "upload-image.uploadImage"
    },
    {
        method: "GET",
        path: "/upload-image/:documentid",
        handler: "upload-image.getImageDetails"
    },
]

module.exports = customRouter(defaultRouter, myExtraRoutes);

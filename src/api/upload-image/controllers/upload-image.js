'use strict';

/**
 * upload-image controller
 */
// @ts-ignore
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::upload-image.upload-image',
    ({ strapi }) => ({
        async uploadImage(ctx) {
            try {
                let {
                    img_name,
                    img_desc,
                    img_url,
                    img_id
                } = ctx.request.body;

                let myPayload = {
                    data: {},
                    message: "Image successfully uploaded!",
                    status: "success"
                };

                const result = await strapi.documents('api::upload-image.upload-image').create({
                    data: {
                       name: img_name,
                       description: img_desc,
                       image_url: img_url,
                       image_id: img_id 
                    }
                });

                if (result) {
                    myPayload.data = result;
                    ctx.status = 200;
                    return ctx.body = myPayload;
                }
            } catch (err) {
                console.log("[uploadImage] Error: ", err.message);
                return ctx.badRequest(err.message);
            }
        }
    })
);

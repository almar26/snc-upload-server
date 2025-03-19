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
        },

        async getImageDetails(ctx) {
            const { documentid } = ctx.params;
            try {
                console.log("[getImageDetails] Incoming Request!");
                let noRecordFound = {
                    message: `No Record Found!`,
                    status: "fail",
                  };

                const result = await strapi.documents("api::upload-image.upload-image").findMany({
                    filters: {
                        documentId: documentid
                    }
                    
                });

                if (result) {
                    ctx.status = 200;
                    return ctx.body = result;
                } 

                if (result.length != 0) {
                    console.log("[getImageDetails] Error: ", result);
                    return ctx.body = noRecordFound;
                }   

            } catch (err) {
                console.log("[getImageDetails] Error: ", err.message);
                return ctx.badRequest(err.message);
            }
        }
    })
);

export const res = {
    success: function (response, data, message = null, statusCode = 200) {
        if (Array.isArray(data) && data.length == 0) {
            data = null;
        }

        response.status(statusCode).json({
            status: statusCode,
            message,
            data
        });
    },

    created: function (response, data, message = null, statusCode = 201) {

        if (Array.isArray(data) && data.length == 0) {
            data = null;
        }

        response.status(statusCode).json({
            status: statusCode,
            message,
            data
        });
    },

    saved: function (response, data, message = null, statusCode = 204) {

        if (Array.isArray(data) && data.length == 0) {
            data = null;
        }

        response.status(statusCode).json({
            status: statusCode,
            message,
            data
        });
    },

    badrequest: function (response, message, statusCode = 400) {
        response.status(statusCode).json({
            status: statusCode,
            message,
            data: null
        });
    },

    unauthorized: function (response, message, statusCode = 401) {
        response.status(statusCode).json({
            status: statusCode,
            message,
            data: null
        });
    },

    forbidden: function (response, message, statusCode = 403) {
        response.status(statusCode).json({
            status: statusCode,
            message,
            data: null
        });
    },

    notfound: function (response, message, statusCode = 404) {
        response.status(statusCode).json({
            status: statusCode,
            message
        });
    },

    error: function (response, message, statusCode = 422) {
        response.status(statusCode).json({
            status: statusCode,
            message,
            data: null
        });
    },

    internal: function (response, message, statusCode = 500) {
        response.status(statusCode).json({
            status: statusCode,
            message,
            data: null
        });
    }
};
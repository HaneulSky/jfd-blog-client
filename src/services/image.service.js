import httpService from "./http.service";

const imageEndPoint = "image/";

const imageService = {
    get: async () => {
        const { data } = await httpService.get(imageEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(imageEndPoint, payload);
        return data;
    },
    remove: async (articleId) => {
        const { data } = await httpService.delete(imageEndPoint + articleId);
        return data;
    }
};

export default imageService;

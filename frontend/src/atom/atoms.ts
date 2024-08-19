import axios from "axios";
import { atom, selector } from "recoil";

export const serverLocationAtom = atom({
    key: "serverLocation",
    default: "https://backend-for-blogging-website.rishit1275.workers.dev/api/v1"
})

export const currentTagAtom = atom({
    key: "currentTagAtom",
    default: ""
})

export const isSubmittingAtom = atom({
    key: "isSubmittingAtom",
    default: false
})

export const tagsAtom = selector({
    key: "tagsAtomSelector",
    get: async ({get}) => {
        const serverLocation = get(serverLocationAtom)
        try {
            const result = await axios.get(`${serverLocation}/tag/tags`, {
                headers: {
                    "Authorization": localStorage.getItem("Authorization")
                },
            })
            return result.data
        } catch (error) {
            throw error
        }
    }
})

export const blogsSelector = selector({
    key: "blogsSelector",
    get: async ({ get }) => {
        const serverLocation = get(serverLocationAtom)
        const currentTag = get(currentTagAtom)
        try {
            const url = (currentTag === "") ? `${serverLocation}/blog/bulk` : `${serverLocation}/tag/getblogs/${currentTag}`;
            const result = await axios.get(url, {
                headers: {
                    Authorization: localStorage.getItem("Authorization"),
                },
            }
            );
            return result.data;
        } catch (error) {
            throw error;
        }
    },
});

export const isUploadableBlogAtom = atom({
    key: "isUploadableBlogAtom",
    default: false
})

export const publishBlogAtom = atom({
    key: "publishBlogAtom",
    default: false
})
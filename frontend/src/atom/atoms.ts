import { atom } from "recoil";

export const serverLocationAtom = atom({
    key: "serverLocation",
    default: "https://backend-for-blogging-website.rishit1275.workers.dev/api/v1"
})
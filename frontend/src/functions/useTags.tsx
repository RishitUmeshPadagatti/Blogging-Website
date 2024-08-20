import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { serverLocationAtom } from "../atom/atoms";
import { useNavigate } from "react-router-dom";
import { Tag } from "../interfaces/interface";
import axios from "axios";

export function useTags(n: number): [Tag[], boolean] {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const serverLocation = useRecoilValue(serverLocationAtom);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const result = await axios.get(`${serverLocation}/tag/tags`, {
                headers: {
                    "Authorization": localStorage.getItem("Authorization"),
                },
            });
            setTags(result.data.tags);
        } catch (error) {
            console.error("Failed to fetch data", error);
            localStorage.clear();
            navigate("/");
            return;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const value = setInterval(() => {
            getData();
        }, n * 1000);

        getData();

        return () => {
            clearInterval(value);
        };
    }, [n]);

    return [tags, loading];
}
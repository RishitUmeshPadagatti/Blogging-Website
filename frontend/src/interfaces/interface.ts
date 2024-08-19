export interface Tag {
    id: string,
    name: string
}

export interface BlogComponentProps {
    title: string;
    content: string;
    author: string;
    tags: Tag[];
    created: string;
}

export interface Blog {
    id: string;
    title: string;
    content: string;
    published: boolean;
    created: string;
    author: {
        name: string;
    };
    authorId: string;
    tags: Tag[];
}

export interface ServerUserResponse {
    id: string,
    name: string,
    email: string,
    posts: Blog[]
}

export interface CapsuleProps {
    name: string
}

export interface AvatarProps {
    initials: string,
    size: number
}

export interface TagsNavbarProps {
    tags: Tag[]
}
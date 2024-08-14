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

export interface CapsuleProps {
    name: string
}

export interface AvatarProps {
    initials: string;
}

export interface TagsNavbarProps {
    tags: Tag[]
}
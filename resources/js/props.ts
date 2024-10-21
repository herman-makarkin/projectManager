export interface UserProps {
    // image: File | undefined;
    id?: string;
    created_at?: string;

    name: string;
    email: string;
    gender: string;
    birthdate: string;
    password: string;
    password_confirmation: string;
}

export interface TaskProps {
    id?: string;
    created_at?: string;
    image_path?: string;
    image: File | undefined;
    name: string;
    status: string;
    priority: string;
    description: string;
    deadline: string;
    assigned_user_id: string;
    project_id: string;
}

export interface Task extends TaskProps {
    project: ProjectProps;
    updated_by: UserProps;
    creator: UserProps;
}

export interface Project extends ProjectProps {
    tasks: TaskProps[];
    creator: UserProps;
    updated_by: UserProps;
    created_at: string;
}

export interface ProjectProps {
    id?: string;
    name: string;
    status: string;
    image_path?: string;
    description: string;
    deadline: string;
    image: File | undefined;
    tasks: TaskProps[];
    creator?: UserProps;
}

export interface queryParamsProps {
    name?: string;
    status?: string;
    priority?: string;
    project_id?: string;
    id?: string;
    created_at?: string;
    updated_at?: string;
    deadline?: string;
    assigned_user_id?: string;

    sort_field: string;
    sort_mode: string;
}

export interface LinkProps {
    active?: boolean;
    label: string;
    url?: string;
    disabled?: boolean;
    key: number;
    href?: string;
    dangerouslySetInnerHTML?: { __html: string };
}

export interface MetaProps {
    links: LinkProps[];
}

export interface TaskData {
    data: Task[];
    meta: MetaProps;
}

export interface UserData {
    data: UserProps[];
    meta: MetaProps;
}

export interface ProjectData {
    data: Project[];
    meta: MetaProps;
}

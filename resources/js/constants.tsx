const common = 'text-white p-1 d-inline-block rounded ';

export const PROJECT_STATUS_CLASS_MAP = {
    pending: 'bg-primary ' + common,
    active: 'bg-danger ' + common,
    finished: 'bg-success ' + common,
};

export const PROJECT_STATUS_TEXT_MAP = {
    pending: 'Pending',
    active: 'Active',
    finished: 'Finished',
};

export const TASK_STATUS_CLASS_MAP = {
    pending: 'bg-primary ' + common,
    active: 'bg-danger ' + common,
    finished: 'bg-success ' + common,
};

export const TASK_STATUS_TEXT_MAP = {
    pending: 'Pending',
    active: 'Active',
    finished: 'Finished',
};

export const TASK_PRIORITY_CLASS_MAP = {
    low: 'bg-primary ' + common,
    medium: 'bg-danger ' + common,
    high: 'bg-success ' + common,
};

export const TASK_PRIORITY_TEXT_MAP = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
};

export const PROJECT_PRIORITY_CLASS_MAP = {
    low: 'bg-primary ' + common,
    medium: 'bg-danger ' + common,
    high: 'bg-success ' + common,
};

export const PROJECT_PRIORITY_TEXT_MAP = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
};


export const APPLICATION_ROUTES = {
    REGISTER_FACILITY: 'register-facility'
};

export const ROUTES_FACILITY = {
    HOME: {
        order: 1,
        path: 'home',
        fullpath: `${APPLICATION_ROUTES.REGISTER_FACILITY}/home`,
        title: 'HOME',
    },
    APPLICANT: {
        order: 2,
        path: 'facility-administrator',
        fullpath: `${APPLICATION_ROUTES.REGISTER_FACILITY}/facility-administrator`,
        title: 'Facility Administrator Information',
    },
    FACILITY: {
        order: 3,
        path: 'facility-info',
        fullpath: `${APPLICATION_ROUTES.REGISTER_FACILITY}/facility-info`,
        title: 'Facility Information',
    },
    REVIEW: {
        order: 4,
        path: 'review',
        fullpath: `${APPLICATION_ROUTES.REGISTER_FACILITY}/review`,
        title: 'Review',
    },
    SUBMIT: {
        order: 5,
        path: 'submit',
        fullpath: `${APPLICATION_ROUTES.REGISTER_FACILITY}/submit`,
        title: 'Submit',
    },
    CONFIRMATION: {
        order: 6,
        path: 'confirmation',
        fullpath: `${APPLICATION_ROUTES.REGISTER_FACILITY}/confirmation`,
        title: 'Confirmation',
    },
};
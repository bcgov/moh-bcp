import { BCP_ROUTES } from '../core-bcp/models/bcp-route-constanst';

export const UPDATE_FACILITY_PAGES = {
    HOME: {
        path: 'home',
        fullpath: `${BCP_ROUTES.UPDATE_FACILITY}/home`,
        title: 'Home'
    },
    FACILITY_ADMIN: {
        path: 'facility-administrator',
        fullpath: `${BCP_ROUTES.UPDATE_FACILITY}/facility-administrator`,
        title: 'Facility Administrator'
    },
    CANCEL_CHANGE: {
        path: 'cancel-change',
        fullpath: `${BCP_ROUTES.UPDATE_FACILITY}/cancel-change`,
        title: 'Cancel/Change'
    },
    REVIEW: {
        path: 'review',
        fullpath: `${BCP_ROUTES.UPDATE_FACILITY}/review`,
        title: 'Review Form Page'
    },
    SUBMISSION: {
        path: 'submission',
        fullpath: `${BCP_ROUTES.UPDATE_FACILITY}/submission`,
        title: 'Confirmation of Submission'
    },
};

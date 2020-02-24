import { BCP_ROUTES } from '../core-bcp/models/bcp-route-constanst';

export const UPDATE_FACILITY_PAGES = {
    HOME: {
        path: 'home',
        fullpath: `${BCP_ROUTES.UPDATE_FACILITY}/home`,
        title: 'Home'
    },
    FORM_PAGE: {
        path: 'form-page',
        fullpath: `${BCP_ROUTES.UPDATE_FACILITY}/form-page`,
        title: 'Form Page'
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

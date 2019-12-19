import { BCP_ROUTES } from '../core-bcp/models/bcp-route-constanst';

export const CREATE_FACILITY_PAGES = {
    HOME: {
        path: 'home',
        fullpath: `${BCP_ROUTES.CREATE_FACILITY}/home`,
        title: 'Application for Medical Services Plan Facility Number (New)'
    },
    FACILITY_ADMIN: {
        path: 'facility-administrator',
        fullpath: `${BCP_ROUTES.CREATE_FACILITY}/facility-administrator`,
        title: 'Facility Administrator Information'
    },
    FACILITY_INFO: {
        path: 'facility-info',
        fullpath: `${BCP_ROUTES.CREATE_FACILITY}/facility-info`,
        title: 'Facility Information'
    },
    REVIEW: {
        path: 'review',
        fullpath: `${BCP_ROUTES.CREATE_FACILITY}/review`,
        title: 'Review Application'
    },
    SUBMISSION: {
        path: 'submission',
        fullpath: `${BCP_ROUTES.CREATE_FACILITY}/submission`,
        title: 'Confirmation of Submission'
    },
};

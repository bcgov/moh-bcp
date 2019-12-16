export const PRACTITIONER_ASSIGNMENT = {
  NEW: {
    label: 'Add new attachment',
    value: 'new',
  },
  CANCEL: {
    label: 'Cancel existing attachment',
    value: 'cancel',
  },
  CHANGE_DATE: {
    label: 'Change existing attachment',
    value: 'change-date',
  },
  LOCUM: {
    label: 'Locum assignment',
    value: 'locum',
  }
};

export const getAssignmentLabelByValue = (value) => {
  for(let type in PRACTITIONER_ASSIGNMENT) {
    if (PRACTITIONER_ASSIGNMENT[type].value == value)  {
      return PRACTITIONER_ASSIGNMENT[type].label;
    }
  }
  return null;
};
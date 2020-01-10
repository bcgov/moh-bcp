// Values for the action part of the schema under pracAssignment
export enum PRAC_ASSIGN_TYPE {
  CANCEL = 'cancel',
  CHANGE = 'change',
  NEW = 'new',
  TEMP = 'temp'
}

export const PRACTITIONER_ATTACHMENT = {
  NEW: {
    label: 'Add new attachment',
    value: 'new',
    reviewText: 'Add a practitioner attachment',
  },
  CANCEL: {
    label: 'Cancel existing attachment',
    value: 'cancel',
    reviewText: 'Cancel a practitioner attachment',
  },
  CHANGE: {
    label: 'Change existing attachment',
    value: 'change',
    reviewText: 'Change existing attachment',
  },
};

export const getAttachmentLabelByValue = (value) => {
  for (const type in PRACTITIONER_ATTACHMENT) {
    if (PRACTITIONER_ATTACHMENT[type].value === value)  {
      return PRACTITIONER_ATTACHMENT[type].label;
    }
  }
  return null;
};

export const getAttachmentReviewTextByValue = (value) => {
  for (const type in PRACTITIONER_ATTACHMENT) {
    if (PRACTITIONER_ATTACHMENT[type].value === value)  {
      return PRACTITIONER_ATTACHMENT[type].reviewText;
    }
  }
  return null;
};

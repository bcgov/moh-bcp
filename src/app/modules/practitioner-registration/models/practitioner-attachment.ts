export const PRACTITIONER_ATTACHMENT = {
  NEW: {
    label: 'Add new attachment',
    value: 'new',
  },
  CANCEL: {
    label: 'Cancel existing attachment',
    value: 'cancel',
  },
  CHANGE: {
    label: 'Change existing attachment',
    value: 'change',
  },
  LOCUM: {
    label: 'Locum assignment',
    value: 'locum',
  }
};

export const getAttachmentLabelByValue = (value) => {
  for(let type in PRACTITIONER_ATTACHMENT) {
    if (PRACTITIONER_ATTACHMENT[type].value == value)  {
      return PRACTITIONER_ATTACHMENT[type].label;
    }
  }
  return null;
};
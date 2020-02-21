import {
  getAttachmentLabelByValue,
  getAttachmentReviewTextByValue,
  PRACTITIONER_ATTACHMENT
} from './practitioner-attachment';


describe('PRACTITIONER_ATTACHMENT', () => {
  it('should be an object', () => {
    expect(PRACTITIONER_ATTACHMENT instanceof Object).toBeTruthy();
  });

  it('should get label by value', () => {
    expect(getAttachmentLabelByValue(PRACTITIONER_ATTACHMENT.NEW.value)).toEqual(PRACTITIONER_ATTACHMENT.NEW.label);
  });

  it('should get review text by value', () => {
    expect(getAttachmentReviewTextByValue(PRACTITIONER_ATTACHMENT.NEW.value)).toEqual(PRACTITIONER_ATTACHMENT.NEW.reviewText);
  });
});

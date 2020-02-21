import { BCPDocumentTypes } from './documentTypes';

describe('BCPDocumentTypes', () => {
  it('should return correct enum value', () => {
    expect(BCPDocumentTypes.Signature).toEqual('SIGNATURE');
  });
});

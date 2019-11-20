// File contains functions that all modules will use
import { format } from 'date-fns';

/**
 * Helper function to display information
 * (used for optional fields to display N/A when not populated)
 */
export function setNotApplicable( str: string ): string {
  return str ? str : 'N/A';
}

// Format the date to be displayed in form January 01, 1999
export function formatDateForDisplay(inputDate): string {
  return inputDate ? format(inputDate, 'MMMM dd, yyyy') : null;
}


// Converts the date to the format required by the JSON schema
export function convertToJSONDate( dt: Date ) {
  if ( dt ) {
    return format( dt, 'yyyy-MM-dd' );
  }
  return null;
}

// Strips formatting characters from phone numbers
export function stripPhoneFormatting( str: string ) {
  if ( str ) {
    return str.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
  }
  return null;
}

// Strips spaces from postal code
export function stripPostalCodeSpaces( str: string ) {
  if ( str ) {
    return str.replace(' ', '');
  }
  return null;
}

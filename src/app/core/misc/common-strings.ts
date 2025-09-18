import { HttpStatusCode } from '@angular/common/http';

export const commonStrings = Object.freeze({
  errors: {
    form: {
      max: 'The value cannot be greater than %s.',
      min: 'The value cannot be less than %s.',
      maxLength: 'The value must not exceed %s characters.',
      minLength: 'The value must be at least %s characters long.',
      required: 'This field is required.'
    },
    http: {
      [HttpStatusCode.BadRequest]: 'An error has occurred.',
      [HttpStatusCode.Forbidden]: 'You do not have permission to perform this action.',
      [HttpStatusCode.InternalServerError]: 'An internal server error occurred. Please try again later.',
      [HttpStatusCode.NotFound]: 'Resource not found.'
    }
  },
  exitUnsaved: {
    confirm: {
      content: 'Leave this page?',
      title: 'Unsaved changes'
    }
  },
  no: 'No',
  submit: 'Submit',
  yes: 'Yes'
});

export type CommonStrings = typeof commonStrings;

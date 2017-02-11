'use strict';

const chai = require('chai');
const path = require('path');

const assert = chai.assert;
const apiUserValidationPath = path.join(__dirname, '..', '..', '..', '..', 'businessLogic', 'apiUser', 'apiUserValidation.js');
const ApiUserValidationClass = require(apiUserValidationPath);

describe('ApiUserValidation', function ApiUserValidation() {
  describe('ValidateCreate', function ValidateCreate() {
    it('Returns no error if validation passes', function CorrectParams(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
            lastName: 'bar',
            emailAddress: 'foo@bar.com',
            password: 'foobar',
            enabled: true,
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isUndefined(error);

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if no json body is passed', function NoJsonBody(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {};

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'No JSON body passed.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if no first name is passed', function NoFirstName(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {},
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'No first name specified.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if empty first name is passed', function EmptyFirstName(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: '',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'No first name specified.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if whitespace first name is passed', function WhitespaceFirstName(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: '   ',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'Blank first name specified.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if no last name is passed', function NoLastName(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'No last name specified.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if empty last name is passed', function EmptyLastName(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
            lastName: '',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'No last name specified.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if whitespace last name is passed', function WhitespaceLastName(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
            lastName: '   ',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'Blank last name specified.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if no email address is passed', function NoEmailAddress(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
            lastName: 'bar',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'No email address specified.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if empty email address is passed', function EmptyEmailAddress(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
            lastName: 'bar',
            emailAddress: '',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'No email address specified.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if whitespace email adress is passed', function WhitespaceEmailAddress(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
            lastName: 'bar',
            emailAddress: '   ',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'Blank email address specified.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if invalid email adress is passed', function InvalidEmailAddress(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
            lastName: 'bar',
            emailAddress: 'foobar',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'Email address is not in a valid format.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if no password is passed', function NoPassword(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
            lastName: 'bar',
            emailAddress: 'foo@bar.com',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'No password specified.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if empty password is passed', function EmptyPassword(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
            lastName: 'bar',
            emailAddress: 'foo@bar.com',
            password: '',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'No password specified.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if whitespace password is passed', function WhitespacePassword(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
            lastName: 'bar',
            emailAddress: 'foo@bar.com',
            password: '   ',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'Blank password specified');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if enabled is not passed', function NoEnabled(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
            lastName: 'bar',
            emailAddress: 'foo@bar.com',
            password: 'foobar',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'Boolean value expected for enabled.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if non-boolean enabled is passed', function NonBooleanEnabled(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
            lastName: 'bar',
            emailAddress: 'foo@bar.com',
            password: 'foobar',
            enabled: 'barfoo',
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'Boolean value expected for enabled.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Returns error if null enabled is passed', function NullEnabled(done) {
      try {
        const apiUserValidation = new ApiUserValidationClass();

        const event = {
          'body-json': {
            firstName: 'foo',
            lastName: 'bar',
            emailAddress: 'foo@bar.com',
            password: 'foobar',
            enabled: null,
          },
        };

        apiUserValidation.validateCreate(event,
          function validateCreateCallback(error) {
            try {
              assert.isDefined(error);
              assert.equal(error.message, 'Boolean value expected for enabled.');

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });
  });
});

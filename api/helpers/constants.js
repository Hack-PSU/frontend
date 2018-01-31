module.exports = {
  emailObjectSchema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      name: {
        type: 'string',
        minLength: 1,
      },
      substitutions: {
        type: 'object',
        additionalProperties: { type: 'string' },
      },
    },
    required: ['email', 'name'],
  },
  emailServerUrl: 'https://api.sendinblue.com/v3/smtp/email',
};

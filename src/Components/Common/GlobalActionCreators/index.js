export const asyncActionNames = (baseName) => (
  {
    failure: `${baseName}_FAILURE`,
    success: `${baseName}_SUCCESS`,
  }
)

export const buildAsyncActions = (actionName) => ({
  failure: (errors) => ({
    type: actionName.failure,
    errors
  }),
  success: (payload) => ({
    type: actionName.success,
    payload
  }),
});

// Role dictionary object mapping route to allowed numerical roles
const roleDict = {
  '': [0, 1, 2],
  marketplace: [0],
  models: [0],
  register_app: [1],
  create_model: [0],
  profile: [0, 1],
  data_scientist_documentation: [0, 1, 2],
  app_developer_documentation: [0, 1, 2],
  tutorial: [0, 1, 2],
  about_us: [0, 1, 2],
  careers: [0, 1, 2],
  press: [0, 1, 2],
  user_guide: [0, 1, 2],
  auth: [0, 1, 2],
};

export default roleDict;

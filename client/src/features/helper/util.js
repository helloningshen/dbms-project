

const baseURL = "http://localhost:5000"

const urls = {
  fetchAll: `${baseURL}/docs`,
  insert: `${baseURL}/upload`,
  download: `${baseURL}/download`,
  info: `${baseURL}/info/save`,
  archive: `${baseURL}/archive`,
  delete: `${baseURL}/delete`,
  register: `${baseURL}/user/register`,
  login: `${baseURL}/user/login`
}


const initialState = {
  docs: [],
  doc: {},
  archive: [],
  formSubmitting: false,
  isLoading: false,
  url: {},
  uploaded: false,
  currentUrl: "",
  isUploading: false,
  success: false,
};

export { urls, initialState }
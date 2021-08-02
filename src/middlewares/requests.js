import axios from "axios";

const makeGetRequest = async (url) => {
  const options = {
    withCredentials: true,
  };

  return await axios
    .get(url, options)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (!err.response && err.request)
        return {
          error:
            "An error ocurred. This is likely due to too many requests. Please try again in a bit.",
        };
    });
};

const makePostRequest = async (url, data) => {
  const options = {
    withCredentials: true,
  };

  return await axios
    .post(url, data, options)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.request)
        return {
          error:
            "An error ocurred. This is likely due to too many requests. Please try again in a bit.",
        };
      else
        return {
          error: err,
        };
    });
};

export const request = {
  get: makeGetRequest,
  post: makePostRequest,
};

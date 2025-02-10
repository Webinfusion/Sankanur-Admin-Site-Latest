const BASE_URL = ' http://localhost:3005';

const getAllPreEvents = '/events/pre';
const getAllPostEvents = '/events/post';
const inserrPreNewEvent = '/events/insert/pre';
const insertPostNewEvent = '/events/insert/post';
const updatePreEvent = '/events/update/pre';
const updatePostEvent = '/events/update/post';
const deletePreEvent = '/events/delete/pre';
const deletePostEvent = '/events/delete/post';
const checkIfImgAlreadyExist = '/cloudinary/check-image';

export const getAllPreEventsConst = BASE_URL + getAllPreEvents;
export const getAllPostEventsConst = BASE_URL + getAllPostEvents;
export const insertPreNewEventConst = BASE_URL + inserrPreNewEvent;
export const insertPostNewEventConst = BASE_URL + insertPostNewEvent;
export const updatePreEventConst = BASE_URL + updatePreEvent;
export const updatePostEventConst = BASE_URL + updatePostEvent;
export const deletePreEventsConst = BASE_URL + deletePreEvent;
export const deletePostEventsConst = BASE_URL + deletePostEvent;
export const checkIfImgAlreadyExistConst = BASE_URL + checkIfImgAlreadyExist;
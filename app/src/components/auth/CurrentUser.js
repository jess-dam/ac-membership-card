const CURRENT_USER = 'CURRENT_USER';

const getCurrentUser = () => {
    return localStorage.getItem(CURRENT_USER);
};

const updateCurrentUser = (userId) => {
    localStorage.setItem(CURRENT_USER, userId);
    console.log('current user set to', localStorage.getItem(CURRENT_USER));
};

const revokeCurrentUser = () => {
    localStorage.removeItem(CURRENT_USER);
}

const CurrentUser = { getCurrentUser, updateCurrentUser, revokeCurrentUser };

export default CurrentUser;
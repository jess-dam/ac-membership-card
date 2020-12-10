const getCurrentUser = () => {
    return localStorage.getItem('currentUser');
};

const updateCurrentUser = (userId) => {
    localStorage.setItem('currentUser', userId);
    console.log('current user set to', localStorage.getItem('currentUser'));
};

const CurrentUser = { getCurrentUser, updateCurrentUser };

export default CurrentUser;
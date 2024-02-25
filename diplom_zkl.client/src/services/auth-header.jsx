export default function authHeader() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo) {
        return { Authorization: "Bearer " + JSON.parse(localStorage.getItem('userInfo')).access_token };
    } else {
        return {};
    }
}
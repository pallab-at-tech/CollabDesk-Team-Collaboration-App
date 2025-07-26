export const baseURL = import.meta.env.VITE_BACKEND_URL

const SummaryApi = {
    register : {
        url : "/api/user/register",
        method : "post"
    },
    refreshToken : {
        url : "/api/user/refresh-token",
        method : "post"
    },
    login : {
        url : "/api/user/login",
        method : "post"
    },
    user_deatails : {
        url : "/api/user/user-details",
        method : "get"
    },
    team_create : {
        url : "/api/teaming/team-create",
        method : "post"
    },
    team_details : {
        url : "/api/teaming/team-details",
        method : "get"
    }
}

export default SummaryApi
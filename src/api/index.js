import axios from '../utils/require.js'
import { getToken } from '../utils/token.js'

// 登录接口
export const loginAPI = ({ mobile, code }) => axios({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})
// 所有频道列表接口
export const list = () => axios({
  url: '/v1_0/channels',
  method: 'GET'
})
// 获取用户频道列表接口
export const getUserChangeListAPI = () => axios({
  url: '/v1_0/user/channels',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
// 文章————列表
export const getArticleListAPI = ({ channel_id, timestamp }) => axios({
  url: '/v1_0/articles',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  params: {
    channel_id,
    timestamp
  }
})
// 文章——反馈——不感兴趣
export const articleNoLikeAPI = ({ artId }) => axios({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: artId
  }
})
// 文章——返回——举报
export const articleBadAPI = ({ artId, value }) => axios({
  url: '/v1_0/article/reports',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: artId,
    type: value,
    remark: '其他举报内容具体文字，省略'
  }
})
// 更新用户频道
export const updateUserList = (newList) => axios({
  url: '/v1_0/user/channels',
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    newList
  }
})
// 搜索建议列表
export const adviceListAPI = ({ keyWorld }) => axios({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
    q: keyWorld
  }
})
// 搜索结果
export const searchResultAPI = ({ page = 1, per_page = 10, q }) => axios({
  url: '/v1_0/search',
  method: 'GET',
  params: {
    page,
    per_page,
    q
  }
})
// 文章详情接口
export const articleDetailAPI = ({ article_id }) => axios({
  url: `/v1_0/articles/${article_id}`,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
// 关注用户接口
export const followUser = ({ followId }) => axios({
  url: '/v1_0/user/followings',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: followId
  }
})
// 取消关注用户接口
export const disFollowUser = ({ followId }) => axios({
  url: `/v1_0/user/followings/${followId}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
// 对文章点赞
export const startArticle = ({ target }) => axios({
  url: '/v1_0/article/likings',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: target
  }
})
// 取消文章点赞接口
export const disStartArticle = ({ target }) => axios({
  url: `/v1_0/article/likings/${target}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
// 获取评论接口
export const getComment = ({ artId, offset, limit = 10 }) => axios({
  url: '/v1_0/comments',
  method: 'GET',
  params: {
    type: 'a',
    source: artId,
    offset: offset,
    limit
  }
})
// 对评论点赞
export const startComment = ({ target }) => axios({
  url: '/v1_0/comment/likings',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: target
  }
})
// 取消评论点赞接口
export const disStartComment = ({ target }) => axios({
  url: `/v1_0/comment/likings/${target}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
// 发送评论接口
export const sentOutComment = ({ id, content }) => axios({
  url: '/v1_0/comments',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: id,
    content: content
  }
})
// 用户主页 - 基本资料
export const userInfoAPI = () => axios({
  url: '/v1_0/user',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
// 用户个人信息的获取
export const userInfomationAPI = () => axios({
  url: '/v1_0/user/profile',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
// 编辑用户资料
export const editUserInfo = ({ name, birthday }) => axios({
  url: '/v1_0/user/profile',
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    name: name,
    birthday: birthday
  }
})
// 编辑用户头像
export const editUserImag = (imagData) => axios({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: imagData
})
// 刷新用户token
export const reGetTokenAPI = () => axios({
  url: '/v1_0/authorizations',
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
  }
})
// 发送验证码短信
export const getVerificationCodeAPI = ({ telephoneNumber }) => axios({
  url: `/v1_0/sms/codes/${telephoneNumber}`,
  method: 'GET'
})
// 收藏文章
export const postStarArticleAPI = ({ target }) => axios({
  url: '/v1_0/article/collections',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: target
  }
})
// 取消收藏
export const disStarArticleAPI = ({ target }) => axios({
  url: `/v1_0/article/collections/${target}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
// 获取用户收藏列表
export const userStarArtListAPI = ({ page = 1, per_page = 10 }) => axios({
  url: '/v1_0/article/collections',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  params: {
    page,
    per_page
  }
})
// 获取用户浏览历史列表
export const userHistorArtListAPI = ({ page = 1, per_page = 10 }) => axios({
  url: '/v1_0/user/histories',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  params: {
    page,
    per_page
  }
})
// 获取用户关注列表接口
export const getUserFollowListAPI = ({ page = 1, per_page = 10 }) => axios({
  url: '/v1_0/user/followings',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  params: {
    page,
    per_page
  }
})
// 获取用户粉丝列表接口
export const getUserFansListAPI = ({ page = 1, per_page = 10 }) => axios({
  url: '/v1_0/user/followings',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  params: {
    page,
    per_page
  }
})

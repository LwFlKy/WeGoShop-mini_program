function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function detectLogined (jump = true) {
  const UserInfo = wx.getStorageSync("userinfo")
  if (UserInfo == "") {
    if (jump) {
      wx.navigateTo({
        url:"/pages/login/main"
      })
    }else{
      return false
    }
  }else{
    return true
  }
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export default {
  formatNumber,
  formatTime,
  detectLogined
}

import $ from 'jquery'

 var PostUserInfo = function (url, data = null) {
  return new Promise ((resolve, revoke) => {
    if (url[url.length-1] !== '/' && url[url.length-1] !== '\\') { url += '/'} //makes sure that the trail end of request has a / is suppose to be important for https
    $.ajax({
      url: url,
      method: "POST",
      data: JSON.stringify(data),
      success: (status) => {
        resolve (status)
        // console.log ('test')
      },
      error: (err) => {
        // console.log ('Post: Error')
        revoke (err)
      }
    });
  })
}

var PostUserInfoHTTPS = function (url, data = null) {
  console.log ('info', 'https://' + window.location.host + url)
  
 return new Promise ((resolve, revoke) => {
   if (url[url.length-1] !== '/' && url[url.length-1] !== '\\') { url += '/'} //makes sure that the trail end of request has a / is suppose to be important for https
   $.ajax({
     url:  'https://' + window.location.host + url,
     method: "POST",
     data: JSON.stringify(data),
     success: (status) => {
       resolve (status)
       // console.log ('test')
     },
     error: (err) => {
       // console.log ('Post: Error')
       revoke (err)
     }
   });
 })
}

export default PostUserInfo

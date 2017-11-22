import $ from 'jquery'

export default PostUserInfo = function (url, data) {
  return new Promise ((resolve, revoke) => {
    $.ajax({
      url: url,
      method: "POST",
      data: data,
      success: (response) => {
        if (data) {
          console.log("Post: Successful")
          resolve (response)
        }
      },
      error: (err) => {
        console.log ('Post: Error')
        revoke (err)
      }
    });


  })

}

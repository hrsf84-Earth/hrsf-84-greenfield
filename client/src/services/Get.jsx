import $ from 'jquery'

Get = function (url, data) {
  return new Promise ((resolve, revoke) => {
    $.ajax({
      url: url,
      method: "GET",
      data: data,
      contentType: 'application/json',
      success: (response) => {
        if (data) {
          console.log("GET: Successful")
          resolve (response)
        }
      },
      error: (err) => {
        console.log ('GET: Error')
        revoke (err)
      }
    });
  })
}


export default Get

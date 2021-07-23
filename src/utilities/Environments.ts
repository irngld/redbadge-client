let APIURL = "";

switch (window.location.hostname) {
  case "localhost":
  case "127.0.0.1":
    APIURL = "http://localhost:5001";
    break;
//   case "XXXXXXXXXXXXXX.herokuapp.com":
//     APIURL = "https://XXXXXXXXXXXXXX.herokuapp.com";
}

export default APIURL;
var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html(" ");
}
function connect() {
    var socket = new SockJS('http://192.168.43.163:9090/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected:' + frame);
        stompClient.subscribe('/topic/door/1', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
        $.get("door/code/1")
    });
}
var qrcode = new QRCode(document.getElementById("qrcode"), {
    width : 300,
    height : 300,
    useSVG: true
});
function makeCode () {		
    var  eltext=JSON.parse(greeting.body)
      if ($("isScan")==true){
        $("name").show()
  }  else{
        $("name").hide()
}
    qrcode.makeCode(eltext);
}
makeCode();
function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}
function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}
function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}
$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});
var audio = document.getElementById("myAudio");
var currentTime = $(".mplayer_curtime");
var durationTime = $(".mplayer_durtime");
var circle = $(".m-circle .a")[0];
var circumference = 2 * Math.PI * 160;
var timer_audio;

// 页面加载完自动播放音乐
$(function(){
        // setInterval("play2()", 100)
        setTimeout("autoplay()", 2000)
    }
)

// 无论状态如何, 强制播放音乐
function autoplay() {
    audio.paused = false;
    audio.play();
    $(".music-box").addClass("mplaying");
    timer_audio = setInterval(() => {
      if (audio.ended) {
        $(".music-box").removeClass("mplaying");
        currentTime.text("00:00");
        circle.setAttribute("stroke-dasharray", "0 999");
      } else {
        currentTime.text(formatTime(audio.currentTime));
        durationTime.text(formatTime(audio.duration));
        var step = circumference / audio.duration;
        var timeDisplay = Math.floor(audio.currentTime);
        circle.setAttribute(
          "stroke-dasharray",
          "" + timeDisplay * step + " " + circumference
        );
      }
    }, 100);
}

function pause() {
    audio.pause();
    $(".music-box").removeClass("mplaying");
}

// paused <-> play 互相转换的开关
function play() {
  if (audio.paused) {
    audio.paused = false;
    audio.play();
    // mplaying是个表示播放中的伪类
    $(".music-box").addClass("mplaying");
    // 每100ms更新一次
    timer_audio = setInterval(() => {
      if (audio.ended) {
        // 如果播放结束了
        $(".music-box").removeClass("mplaying");
        currentTime.text("00:00");
        circle.setAttribute("stroke-dasharray", "0 999");
      } else {
        // 正在播放中
        currentTime.text(formatTime(audio.currentTime));
        durationTime.text(formatTime(audio.duration));
        var step = circumference / audio.duration;
        var timeDisplay = Math.floor(audio.currentTime);
        circle.setAttribute(
          "stroke-dasharray",
          "" + timeDisplay * step + " " + circumference
        );
      }
    }, 100);
  } else {
    // 如果正在播放, 则pause
    audio.pause();
    $(".music-box").removeClass("mplaying");
  }
}

// 把一个数字time变为格式化后的字符串
function formatTime(time) {
    // console.log(time);
    // 操作符~, 是按位取反的意思，
    // 表面上~~(取反再取反)没有意义，
    // 实际上在js中可以将浮点数变成整数
    time = ~~time;
    var formatTime;
    if (time < 10) {
    formatTime = "00:0" + time;
    } else if (time < 60) {
    formatTime = "00:" + time;
    } else {
    var m = ~~(time / 60);
    if (m < 10) {
        m = "0" + m;
    }
    var s = time % 60;
    if (s < 10) {
        s = "0" + s;
    }
    formatTime = m + ":" + s;
    }
    return formatTime;
}

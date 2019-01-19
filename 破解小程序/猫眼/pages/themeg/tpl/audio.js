function autoAudioPlay() {
    var t = wx.createInnerAudioContext();
    t.src = "https://static.meituan.net/bs/MYFE/wxapp-wallet/file/images/audio/the-meg-btn.mp3", 
    t.play();
}

module.exports = autoAudioPlay;
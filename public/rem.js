function remSize() {
    // 获取屏幕的宽度
    let deviceWidth = document.documentElement.clientWidth||window.innerWidth;
    if (deviceWidth >= 750) {
        deviceWidth = 750;
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320;
    }
    // 设置根元素的字体大小
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    document.querySelector('body').style.fontSize = 0.3 + 'rem';

}
window.onresize= function() {
    remSize();
}
window.onload= function() {
    remSize();
}

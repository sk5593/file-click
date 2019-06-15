(function (doc, win) {
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) {
            return false;
        } else {
            if (clientWidth >= 750) {
                clientWidth = 750;
            } else if (clientWidth <= 320) {
                clientWidth = 320;
            }
            docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
        }
    }
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
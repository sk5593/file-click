(function (doc, win) {
    let docEl = doc.documentElement
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    let recalc = function () {
        let clientWidth = docEl.clientWidth
        let clientHeight = docEl.clientHeight
        if (!clientWidth || !clientHeight) {
            return false
        } else {
            if (clientWidth >= 640) {
                clientWidth = 640
            } else if (clientWidth <= 320) {
                clientWidth = 320
            }
            let zRatio = clientWidth / clientHeight
            let ratio = 375 / 812
            let size = zRatio > ratio ? clientHeight * ratio / 375 : clientWidth / 375
            docEl.style.fontSize = 100 * size + 'px'
        }
    }
    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
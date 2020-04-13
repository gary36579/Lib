
$.SetSystemAlert = (function () {
    function Base(title, content, action) {
        $.alert({
            title: title,
            content: content,
            escapeKey: false,
            buttons: {
                ok: {
                    text: 'OK',
                    keys: ['enter', 'esc'],
                    btnClass: 'btn-default',
                    action: action
                }
            },
            animateFromElement: false,
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false
        });
    }
    var method = {
        WithTitle: function (title, content, action) {
            Base(title, content, action);
        },
        WithoutTitle: function (content, action) {
            Base(false, content, action);
        }
    };
    return method;
})();

// class SystemAlert {
//     constructor () {}

//     static _Base(title, content, action) {
//         $.alert({
//             title: title,
//             content: content,
//             buttons: {
//                 ok: {
//                     text: 'OK',
//                     btnClass: 'btn-default',
//                     action: action
//                 }
//             },
//             animateFromElement: false,
//             scrollToPreviousElement: false,
//             scrollToPreviousElementAnimate: false
//         });
//     }

//     static WithTitle(title, content, action) {
//         this._Base(title, content, action);
//     }

//     static WithoutTitle(content, action) {
//         this._Base(false, content, action);
//     }
// }
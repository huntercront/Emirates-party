WebFontConfig = {
    google: { families: ['Cormorant Infant:700', 'Inter:400,600&display=swap'] }
};
// 'Cormorant Infant:700&display=swap', 
(function(d) {
    var wf = d.createElement('script'),
        s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
})(document);


//loader function
var Loader = function() {}
Loader.prototype = {
    require: function(scripts, callback) {
        this.loadCount = 0;
        this.totalRequired = scripts.length;
        this.callback = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(scripts[i]);
        }
    },
    loaded: function(evt) {
        this.loadCount++;

        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function(src) {
        var self = this;
        var s = document.createElement('script');
        s.type = "text/javascript";
        s.defer = true;
        s.src = src;
        s.addEventListener('load', function(e) { self.loaded(e); }, false);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(s);
    }
}


var l = new Loader();
l.require([
        "/js/lazy-load.js"
    ],
    function() {});

var l = new Loader();
l.require([
        "/js/scroll.js"
    ],
    function() {});



let mMenu = document.querySelector('.mobile-icon')
let menu = document.querySelector('.header-info')
let overlay = document.querySelector('.header-overley')

if (mMenu) {
    mMenu.addEventListener('click', function(e) {

        this.querySelector('.ham').classList.toggle('active')
        menu.classList.toggle('visible')
        overlay.classList.toggle('overley-active')


    })
    overlay.addEventListener('click', function(e) {
        if (this.classList.contains('overley-active') && (mMenu.querySelector('.ham').classList.contains('active'))) {
            menu.classList.toggle('visible')
            this.classList.toggle('overley-active')
            mMenu.querySelector('.ham').classList.toggle('active')
        }
    })
}

document.addEventListener("DOMContentLoaded", function(event) {

    let slideUp = (target, duration = 500) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            //alert("!");
        }, duration);
    }

    let slideDown = (target, duration = 500) => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none')
            display = 'block';
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }, duration);
    }
    var slideToggle = (target, duration = 500) => {
        if (window.getComputedStyle(target).display === 'none') {
            return slideDown(target, duration);
        } else {
            return slideUp(target, duration);
        }
    }

    // let books = document.querySelectorAll('.leaning-button')
    // books.forEach(function(book) {
    //     book.addEventListener('click', function(event) {
    //         if (event.target.closest('.leaning-el').classList.contains('active-el')) {
    //             slideUp(event.target.closest('.leaning-el').querySelector('.hidden-list'), 300);
    //             event.target.closest('.leaning-el').classList.remove('active-el');
    //         } else {
    //             if (document.querySelector('.active-el')) {
    //                 slideToggle(document.querySelector('.active-el .hidden-list'), 300);
    //                 document.querySelector('.active-el').classList.toggle('active-el');
    //             }
    //             slideDown(event.target.closest('.leaning-el').querySelector('.hidden-list'), 300);
    //             event.target.closest('.leaning-el').classList.add('active-el');
    //         }
    //     })
    // })


    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(outer);
        const inner = document.createElement('div');
        outer.appendChild(inner);
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        outer.parentNode.removeChild(outer);
        return scrollbarWidth;
    }


    var modals = document.querySelectorAll('[data-modal-open]');
    var modalOverlay = document.querySelector('.modal-overley');

    function openModal(modal) {
        modalOverlay.classList.add('overley-active')
        let modalWindow = document.querySelector('[data-modal=' + modal.getAttribute('data-modal-open') + ']')
        modalWindow.classList.add('modal-open');
        if (document.body.offsetHeight > window.innerHeight) {
            document.body.style.paddingRight = getScrollbarWidth() + 'px';
            // document.querySelector('.header').style.paddingRight = getScrollbarWidth() + 'px';
            document.body.classList.add('bodylock');
            let tourImg = modal.closest('.party-card').querySelector('.p-party-img picture img').currentSrc;
            let tourTitle = modal.closest('.party-card').querySelector('.p-party-title').textContent;
            let fullDescr = modal.getAttribute('full-descr')
            let timeDescr = modal.getAttribute('time-descr')
            let priceDescr = modal.getAttribute('price-descr')
            modalWindow.querySelector('.descr-img img').setAttribute('src', tourImg);
            modalWindow.querySelector('.descr-title').textContent = tourTitle;
            modalWindow.querySelector('.party-time span').textContent = timeDescr;
            modalWindow.querySelector('.party-value span').textContent = priceDescr;
            modalWindow.querySelector('.party-must').innerHTML = fullDescr;

        }

    }


    function closeModal(modal) {
        modal.classList.add('modal-will-close');
        if (modal.getAttribute('data-modal') == 'video') {
            stopVideo(document.querySelector('.m-video'))
        }

        modal.addEventListener("animationend", function() {
            if (modal.classList.contains('modal-will-close')) {
                modalOverlay.classList.remove('overley-active')
                this.classList.remove('modal-open');
                this.classList.remove('modal-will-close');
                if (document.body.offsetHeight > window.innerHeight) {
                    document.body.classList.remove('bodylock');
                    document.body.style.paddingRight = '0px';
                    document.querySelector('.header').style.paddingRight = '0px'
                }
            }
        });
    }


    modals.forEach(function(modal) {
        modal.addEventListener('click', function(event) {
            event.preventDefault();
            openModal(modal);
        });
    });





    var modalCloseButtons = document.querySelectorAll('.close-modal')
    if (modalCloseButtons) {
        modalCloseButtons.forEach(function(modalCloseButton) {
            modalCloseButton.addEventListener('click', function(event) {
                event.preventDefault();
                closeModal(modalCloseButton.closest('.modal'))
            });
        });
    }

    if (document.querySelector('.modal')) {
        document.querySelector('.modal').addEventListener('click', function(event) {
            if (!event.target.matches('.modal-open')) return
            closeModal(this);
        });
    }


});
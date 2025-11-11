/*------------------------------------------------------------------
* Project:        Travelin - Travel Tour Booking HTML Templates
* Author:         bizberg_themes
* URL:            https://themeforest.net/user/bizberg_themes
* Created:        06/27/2022
-------------------------------------------------------------------
*/

 (function($) {
     "use strict";


      /*======== Doucument Ready Function =========*/
    jQuery(document).ready(function () {
     //CACHE JQUERY OBJECTS
      $("#status").fadeOut();
      $("#preloader").delay(200).fadeOut("slow");
      $("body").delay(200).css({ "overflow": "visible" });

      
      /* Init Wow Js */
      new WOW().init();

    });

     //search categories
    $('a[href="#search1"]').on('click', function(event) {
         event.preventDefault();
         $('#search1').addClass('open');
         $('#search1 > form > input[type="search"]').focus();
     });
     $('#search1, #search1 button.close').on('click keyup', function(event) {
         if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
             $(this).removeClass('open');
         }
     });

    jQuery(document).ready(() => {
         jQuery('.js-video-button').modalVideo({
             channel: 'vimeo'
         });
     });

     // Range sliders activation
     $(".range-slider-ui").each(function() {
         var minRangeValue = $(this).attr('data-min');
         var maxRangeValue = $(this).attr('data-max');
         var minName = $(this).attr('data-min-name');
         var maxName = $(this).attr('data-max-name');
         var unit = $(this).attr('data-unit');
         $(this).slider({
             range: true,
             min: minRangeValue,
             max: maxRangeValue,
             values: [minRangeValue, maxRangeValue],
             slide: function(event, ui) {
                 event = event;
                 var currentMin = parseInt(ui.values[0]);
                 var currentMax = parseInt(ui.values[1]);
                 $(this).children(".min-value").text(currentMin + " " + unit);
                 $(this).children(".max-value").text(currentMax + " " + unit);
                 $(this).children(".current-min").val(currentMin);
                 $(this).children(".current-max").val(currentMax);
             }
         });
     });


     /* ------------------------------------------------------------------------ */
     /* BACK TO TOP
    /* ------------------------------------------------------------------------ */
     $(document).on('click', '#back-to-top, .back-to-top', () => {
         $('html, body').animate({
             scrollTop: 0
         }, '500');
         return false;
     });
     $(window).on('scroll', () => {
         if ($(window).scrollTop() > 500) {
             $('#back-to-top').fadeIn(200);
         } else {
             $('#back-to-top').fadeOut(200);
         }
     });

     // Slick SLider
     $('.slider-store').slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         direction: 'vertical',
         arrows: false,
         dots: false,
         fade: true,
         autoplay: true,
         asNavFor: '.slider-thumbs'
     });
    

     $('.slider-thumbs').slick({
         slidesToShow: 5,
         slidesToScroll: 1,
         asNavFor: '.slider-store',
         dots: false,
         arrows: false,
         autoplay: true,
         direction: 'vertical',
         centerMode: true,
         focusOnSelect: true,
         responsive: [{
             breakpoint: 800,
             settings: {
                 arrows:false,
             }
         }]

     });


     $('.review-slider').slick({
         infinite: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: true,
         dots: false,
         rows:0,
         autoplay: true,
         speed: 2000,
         loop:true,
         responsive: [{
             breakpoint: 991,
             settings: {
                 slidesToShow: 1,
                 arrows: false,
             }
         }]
     });

     $('.review-slider1').slick({
         infinite: true,
         slidesToShow: 2,
         slidesToScroll: 1,
         arrows: false,
         dots: false,
         rows:0,
         autoplay: true,
         speed: 5000,
         loop:true,
         responsive: [{
             breakpoint: 1100,
             settings: {
                 slidesToShow: 1
             }
         }]
     });

     $('.about-slider').slick({
         infinite: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: false,
         dots: false,
         autoplay: true,
         rows:0,
         speed: 4000,
         loop:true,
         responsive: [{
             breakpoint: 700,
             settings: {
                 arrows:false
             }
         }]
     });

     $('.side-slider').slick({
         infinite: true,
         slidesToShow: 6,
         slidesToScroll: 1,
         arrows: false,
         rows:0,
         dots: false,
         autoplay: true,
         speed: 4000,
         loop:true,
          responsive: [{
             breakpoint: 1000,
             settings: {
                 slidesToShow: 3
             }
         }, 
         {
             breakpoint: 811,
             settings: {
                 slidesToShow: 2
            }
         }, 
         {
             breakpoint: 500,
             settings: {
                 slidesToShow: 1
             }
         }]
     });

      $('.attract-slider').slick({
         infinite: true,
         slidesToShow: 8,
         slidesToScroll: 1,
         arrows: false,
         dots: false,
         speed: 2000,
         rows:0,
         autoplay: true,
         draggable:false,
         responsive: [{
             breakpoint: 1000,
             settings: {
                 slidesToShow: 4
             }
         }, 
         {
             breakpoint: 600,
             settings: {
                 slidesToShow: 3
            }
         }, 
         {
             breakpoint: 500,
             settings: {
                 slidesToShow: 2
             }
         }]
     });

    
     $('.team-slider').slick({
         infinite: true,
         slidesToShow: 3,
         slidesToScroll: 1,
         arrows: false,
         dots: true,
         autoplay: true,
         speed: 1000,
         rows:0,
         loop:true,
         responsive: [{
             breakpoint: 1000,
             settings: {
                 slidesToShow: 2
             }
         }, {
             breakpoint: 750,
             settings: {
                 slidesToShow: 1
             }
         }]
     });

     $('.item-slider').slick({
         infinite: true,
         slidesToShow: 3,
         slidesToScroll: 1,
         arrows: true,
         dots: false,
         autoplay: true,
         speed: 2000,
         rows:0,
         loop:true,
         responsive: [{
             breakpoint: 1000,
             settings: {
                 slidesToShow: 2,
                 arrows: false,
             }
         }, {
             breakpoint: 750,
             settings: {
                 slidesToShow: 1,
                 arrows: false,
             }
         }]
     });

     $('.item-slider1').slick({
         infinite: true,
         slidesToShow: 3,
         slidesToScroll: 1,
         arrows: false,
         dots: false,
         autoplay: true,
         speed: 2000,
         rows:0,
         loop:true,
         responsive: [{
             breakpoint: 1000,
             settings: {
                 slidesToShow: 1,
                 arrows: false,
             }
         }, {
             breakpoint: 750,
             settings: {
                 slidesToShow: 1,
                 arrows: false,
             }
         }]
     });

     $('.item-slider2').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplay: true,
        speed: 2000,
        rows:0,
        loop:true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    arrows: true,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
            }
        }]
    });

     $('.banner-slider').slick({
         infinite: true,
         slidesToShow: 4,
         slidesToScroll: 1,
         arrows: true,
         dots: false,
         autoplay: true,
         speed: 2000,
         rows:0,
         cursor: false,
         loop:true,
         responsive: [{
             breakpoint: 1000,
             settings: {
                 slidesToShow: 2
             }
         }, {
             breakpoint: 800,
             settings: {
                 slidesToShow: 1
             }
         }]
     });

     $('.shop-slider').slick({
         infinite: true,
         slidesToShow: 4,
         slidesToScroll: 1,
         arrows: false,
         dots: false,
         autoplay: true,
         speed: 2000,
         rows:0,
         cursor: false,
         loop:true,
         responsive: [{
             breakpoint: 1000,
             settings: {
                 slidesToShow: 2
             }
         }, {
             breakpoint: 800,
             settings: {
                 slidesToShow: 1
             }
         }]
     });

     // Slick Testimonial Slider
        $('.sl-testimonial-slider').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: true,
          verticalSwiping: true,
          autoplay: true,
          Speed: 8000,
          rows:0,
          infinite: true,
          arrows: false,
          dots: false,
          adaptiveHeight: true
        });

     $('.partner-slider').slick({
         infinite: true,
         slidesToShow: 5,
         slidesToScroll: 1,
         arrows: false,
         dots: false,
         autoplay: true,
         speed: 2000,
         rows:0,
         loop:true,
         responsive: [{
             breakpoint: 1000,
             settings: {
                 slidesToShow: 3
             }
         }, {
             breakpoint: 800,
             settings: {
                 slidesToShow: 2
             }
         }, {
             breakpoint: 500,
             settings: {
                 slidesToShow: 1
             }
         }]
     });


     $("#contactform2").validate({      
      submitHandler: function() {
        
        $.ajax({
          url : 'mail/contact.php',
          type : 'POST',
          data : {
            fname : $('input[name="first_name"]').val(),
            lname : $('input[name="last_name"]').val(),
            email : $('input[name="email"]').val(),
            phone : $('input[name="phone"]').val(),
            comments : $('textarea[name="comments"]').val(),
          },
          success : function( result ){
            $('#contactform-error-msg').html( result );
            $("#contactform2")[0].reset();
          }     
        });

      }
    });

    $('.blog-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplay: true,
        speed: 2000,
        rows:0,
        loop:true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    arrows: true,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    arrows: false,
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                }
            }
        ]
    });

    $('.promo-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplay: true,
        speed: 2000,
        rows:0,
        loop:true,
        responsive: [{
            breakpoint: 1000,
            settings: {
                slidesToShow: 3,
                arrows: false,
            }
        }, {
            breakpoint: 750,
            settings: {
                slidesToShow: 1,
                arrows: false,
            }
        }]
    });

    
     /*-----------------------------------------------------------------------------------*/
    /*  COUNTDOWN
    /*-----------------------------------------------------------------------------------*/

     $(document).ready(() => {
         loopcounter('coming-counter');
     });

    /*-----------------------------------------------------------------------------------*/
    /*  COUNTER UP
    /*-----------------------------------------------------------------------------------*/
    $('.value').counterUp({
        delay: 50,
        time: 1000
    });
    /*-----------------------------------------------------------------------------------*/
    /*  MASONRY
    /*-----------------------------------------------------------------------------------*/
    
     $('.blog-main').masonry({
         // options
         itemSelector: '.mansonry-item',
     });

     $('.trend-box1').masonry({
         // options
         itemSelector: '.mansonry-item1',
     });

     // Nice Select JS
     $('.niceSelect').niceSelect();

     $('a[href="#search1"]').on('click', function(event) {
         event.preventDefault();
         $('#search1').addClass('open');
         $('#search1 > form > input[type="search"]').focus();
     });
     $('#search1, #search1 button.close').on('click keyup', function(event) {
         if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
             $(this).removeClass('open');
         }
     });
     //Do not include! This prevents the form from submitting for DEMO purposes only!
     $('form').submit(function(event) {
         event.preventDefault();
         return false;
     });

 })(jQuery);


 jQuery(window).on('resize load', () => {
     resize_eb_slider();
 }).resize();
 /**
  * Resize slider
  */
 function resize_eb_slider() {
     let bodyheight = jQuery(this).height();
     if (jQuery(window).width() > 1400) {
         bodyheight *= 0.90;
         jQuery('.slider').css('height', `${bodyheight}px`);
     }
 }

/* Mega-Menu JS*/ 

(function () {
  const trigger = document.getElementById('megaTrigger');
  const panel   = document.getElementById('megaFull');
  const closeBt = panel.querySelector('.mega-close');
  const body    = document.body;

  // --- Kaydırma kilidi (sadece JS) ---
  let _scrollY = 0;

  const preventScroll = (e) => {
    // wheel / touchmove default'larını engelle
    e.preventDefault();
  };

  const preventScrollKeys = (e) => {
    // Klavye ile kaydırmayı engelle
    const k = e.key;
    if (k === ' ' || k === 'Spacebar' || // eski tarayıcı desteği
        k === 'PageUp' || k === 'PageDown' ||
        k === 'Home' || k === 'End' ||
        k === 'ArrowUp' || k === 'ArrowDown' ||
        k === 'ArrowLeft' || k === 'ArrowRight') {
      e.preventDefault();
    }
  };

  function lockScroll() {
    // 1) Anlık konumu sakla
    _scrollY = window.scrollY || document.documentElement.scrollTop || 0;

    // 2) Scrollbar genişliği kadar sağ padding vererek layout kaymasını önle
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    if (sbw > 0) body.style.paddingRight = sbw + 'px';

    // 3) Body'yi fixed'e alarak kaydırmayı fiziksel olarak durdur
    body.style.position = 'fixed';
    body.style.top = `-${_scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    // 4) Tüm kaydırma girişimlerini iptal et
    window.addEventListener('wheel',     preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown',   preventScrollKeys, { passive: false });

    // (isteğe bağlı) Orta tuş auto-scroll kapatma:
    // window.addEventListener('mousedown', (e)=>{ if(e.button===1) e.preventDefault(); }, { passive:false });
  }

  function unlockScroll() {
    // Eventleri geri al
    window.removeEventListener('wheel',     preventScroll, { passive: false });
    window.removeEventListener('touchmove', preventScroll, { passive: false });
    window.removeEventListener('keydown',   preventScrollKeys, { passive: false });

    // Body stilini eski haline getir
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';
    body.style.paddingRight = '';

    // Kaldığı yere geri sar
    window.scrollTo(0, _scrollY);
  }

  // --- Var olan fonksiyonlarına entegre et ---
  function setNavHeight(){ /* sende zaten var, dokunmuyoruz */ }

  function openMega() {
  setNavHeight();
  panel.classList.add('is-open');
  panel.setAttribute('aria-hidden', 'false');
  body.classList.add('mega-lock');
  lockScroll();
}


  function closeMega() {
  // önce odağı kaldır
  if (document.activeElement && panel.contains(document.activeElement)) {
    document.activeElement.blur();
  }

  // sonra aria ve class işlemleri
  panel.classList.remove('is-open');
  panel.setAttribute('aria-hidden', 'true');
  body.classList.remove('mega-lock');
  unlockScroll();
}


  function toggle(e){
    e.preventDefault();
    panel.classList.contains('is-open') ? closeMega() : openMega();
  }

  trigger.addEventListener('click', toggle);
  closeBt.addEventListener('click', closeMega);
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && panel.classList.contains('is-open')) closeMega(); });
  panel.addEventListener('click', (e)=>{ if(e.target===panel) closeMega(); });

  // sekmeler vs. kalan kodların aynı kalabilir…
})();


/*mega menu img change JS*/

document.addEventListener('DOMContentLoaded', function () {
  const mega = document.getElementById('megaFull');
  if (!mega) return;

  const catsNav = mega.querySelector('.mega-cats');
  const catLinks = Array.from(catsNav.querySelectorAll('[data-mega-tab]'));
  const lists = Array.from(mega.querySelectorAll('.mega-content .mega-list'));
  const heroImg = mega.querySelector('#megaHero') || mega.querySelector('.mega-grid > img');

  // HTML'de data-hero yoksa kullanılacak fallback eşlemesi
  const HERO_MAP = {
    eu: 'images/mega-menu-photo/europian.jpg',
    af: 'images/mega-menu-photo/africansafari.jpg',
    la: 'images/mega-menu-photo/latin-america.jpg',
    sp: 'images/mega-menu-photo/guney-pasific.jpg',
    as: 'images/mega-menu-photo/asia.jpg',         // Asya = Tokyo görselin
    me: 'images/mega-menu-photo/midle-East.jpg',
    an: 'images/mega-menu-photo/antartica.jpg',
    afs:'images/mega-menu-photo/africansafari.jpg',
    gt: 'images/mega-menu-photo/cruise.jpg'
  };


  function showTab(key) {
    // Sol menü: aktif link sınıfı
    catLinks.forEach(a => {
      const isTarget = a.dataset.megaTab === key;
      a.classList.toggle('is-active', isTarget);
      a.setAttribute('aria-current', isTarget ? 'true' : 'false');
    });

    // Sağ listeler: sadece hedef UL görünür, diğerleri gizli
    lists.forEach(ul => {
      const match = ul.dataset.megaContent === key;
      if (match) {
        ul.hidden = false;
        ul.setAttribute('aria-hidden', 'false');
      } else {
        ul.hidden = true;
        ul.setAttribute('aria-hidden', 'true');
      }
    });

    // Hero görsel: data-hero > HERO_MAP > mevcut src (fallback)
    const activeLink = catLinks.find(a => a.dataset.megaTab === key);
    if (heroImg && activeLink) {
      const nextSrc = activeLink.dataset.hero || HERO_MAP[key] || heroImg.getAttribute('src');
      if (nextSrc && heroImg.getAttribute('src') !== nextSrc) {
        // Küçük bir geçiş efekti istersen:
        heroImg.style.opacity = '0';
        const altText = activeLink.textContent.trim();
        const img = new Image();
        img.onload = () => {
          heroImg.src = nextSrc;
          heroImg.alt = altText;
          requestAnimationFrame(() => { heroImg.style.opacity = '1'; });
        };
        img.src = nextSrc;
      } else {
        heroImg.alt = activeLink.textContent.trim();
      }
    }
  }

  // Tıklama ve klavye (Enter/Space) ile sekme değiştir
  catsNav.addEventListener('click', function (e) {
    const a = e.target.closest('[data-mega-tab]');
    if (!a) return;
    e.preventDefault();
    showTab(a.dataset.megaTab);
  });

  catsNav.addEventListener('keydown', function (e) {
    const a = e.target.closest('[data-mega-tab]');
    if (!a) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showTab(a.dataset.megaTab);
    }
  });

  // Başlangıç durumu: .is-active varsa onu aç; yoksa ilkini
  const initial = catLinks.find(a => a.classList.contains('is-active')) || catLinks[0];
  if (initial) showTab(initial.dataset.megaTab);
});

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

;(function () {
  const trigger = document.getElementById("megaTrigger")
  const panel = document.getElementById("megaFull")
  const closeBt = panel.querySelector(".mega-close")
  const body = document.body

  // =========================
  // MEGA: EN ÜST + KAPALIYKEN ÖRTMESİN
  // =========================
//   const MEGA_TOP_Z = -1
  // Panelin "doğru" arka planını bir kere yakalayıp saklayacağız
  let _megaBgFallback = ""

  function captureMegaBgFallback() {
    if (!_megaBgFallback) {
      const bg = getComputedStyle(panel).backgroundColor
      // transparent değilse sakla
      if (bg && bg !== "transparent" && !bg.includes("rgba(0, 0, 0, 0)")) {
        _megaBgFallback = bg
      }
    }
  }

  function ensureMegaBg() {
    const bg = getComputedStyle(panel).backgroundColor
    const isTransparent = !bg || bg === "transparent" || bg.includes("rgba(0, 0, 0, 0)")
    if (isTransparent && _megaBgFallback) {
      panel.style.setProperty("background-color", _megaBgFallback, "important")
    }
  }

  function megaClosedState() {
    // Kapalıyken panel asla sayfanın üstünde “cam” gibi durmasın
    panel.style.setProperty("pointer-events", "none", "important")
    panel.style.setProperty("z-index", "-1", "important")

    // İstersen burada position/inset zorlaması yok. CSS’in normal akışı kalsın.
    panel.style.removeProperty("position")
    panel.style.removeProperty("inset")
    panel.style.removeProperty("overscroll-behavior")
    panel.style.removeProperty("touch-action")
    // background-color’ı da CSS’ine bırakıyoruz; sadece gerektiğinde ensureMegaBg basar
    // panel.style.removeProperty('background-color');
  }

  function megaOpenState() {
    // Açıkken fullscreen overlay ve en üstte
    panel.style.setProperty("position", "fixed", "important")
    panel.style.setProperty("inset", "0", "important")
    panel.style.setProperty("z-index", "-1", "important")
    panel.style.setProperty("pointer-events", "auto", "important")

    panel.style.setProperty("overscroll-behavior", "none", "important")
    panel.style.setProperty("touch-action", "none", "important")

    captureMegaBgFallback()
    ensureMegaBg()
  }

  // =========================
  // KAYDIRMA KİLİDİ (TIKLAMAYI BOZMADAN)
  // =========================
  let _scrollY = 0

  const preventScroll = e => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  const preventScrollKeys = e => {
    const k = e.key
    if (k === " " || k === "Spacebar" || k === "PageUp" || k === "PageDown" || k === "Home" || k === "End" || k === "ArrowUp" || k === "ArrowDown" || k === "ArrowLeft" || k === "ArrowRight") {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  }

  function lockScroll() {
    _scrollY = window.scrollY || document.documentElement.scrollTop || 0

    const sbw = window.innerWidth - document.documentElement.clientWidth
    if (sbw > 0) body.style.paddingRight = sbw + "px"

    body.style.position = "fixed"
    body.style.top = `-${_scrollY}px`
    body.style.left = "0"
    body.style.right = "0"
    body.style.width = "100%"

    document.documentElement.style.overscrollBehavior = "none"
    body.style.overscrollBehavior = "none"

    // capture:true: başka handler’lardan önce kes
    window.addEventListener("wheel", preventScroll, { passive: false, capture: true })
    window.addEventListener("touchmove", preventScroll, { passive: false, capture: true })
    window.addEventListener("keydown", preventScrollKeys, { passive: false, capture: true })
  }

  function unlockScroll() {
    window.removeEventListener("wheel", preventScroll, { capture: true })
    window.removeEventListener("touchmove", preventScroll, { capture: true })
    window.removeEventListener("keydown", preventScrollKeys, { capture: true })

    document.documentElement.style.overscrollBehavior = ""
    body.style.overscrollBehavior = ""

    body.style.position = ""
    body.style.top = ""
    body.style.left = ""
    body.style.right = ""
    body.style.width = ""
    body.style.paddingRight = ""

    window.scrollTo(0, _scrollY)
  }

  // --- Var olan fonksiyonlarına entegre et ---
  function setNavHeight() {
    /* sende zaten var */
  }

  function openMega() {
    setNavHeight()

    megaOpenState()

    panel.classList.add("is-open")
    panel.setAttribute("aria-hidden", "false")
    body.classList.add("mega-lock")

    lockScroll()

    // Bazı CSS’ler class sonrası background veriyor olabilir; garanti olsun:
    ensureMegaBg()
  }

  function closeMega() {
    if (document.activeElement && panel.contains(document.activeElement)) {
      document.activeElement.blur()
    }

    panel.classList.remove("is-open")
    panel.setAttribute("aria-hidden", "true")
    body.classList.remove("mega-lock")

    unlockScroll()

    megaClosedState()
  }

  function toggle(e) {
    e.preventDefault()
    panel.classList.contains("is-open") ? closeMega() : openMega()
  }

  trigger.addEventListener("click", toggle)
  // Mobil gecikme vs için:
  trigger.addEventListener("touchstart", toggle, { passive: false })

  closeBt.addEventListener("click", closeMega)
  closeBt.addEventListener(
    "touchstart",
    e => {
      e.preventDefault()
      closeMega()
    },
    { passive: false },
  )

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && panel.classList.contains("is-open")) closeMega()
  })

  panel.addEventListener("click", e => {
    if (e.target === panel) closeMega()
  })

  // Başlangıçta kapalı state’i zorla (navbar “cam panel” yüzünden ölmesin)
  megaClosedState()
  captureMegaBgFallback()
})()


// Hava durumu JS


document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("havaTablosu");
    const rows  = table.querySelectorAll("tbody tr");

    rows.forEach(row => {
        // 0: Ay, 1: Min, 2: Max, 3: Yağmur
        const minCell  = row.children[1];
        const maxCell  = row.children[2];
        const rainCell = row.children[3];

        const min  = parseFloat(minCell.textContent);
        const max  = parseFloat(maxCell.textContent);
        const rain = parseFloat(rainCell.textContent);

        // --- Min sıcaklık ---
        if (min < 0) {
            minCell.classList.add("temp-cold");
        } else if (min < 10) {
            minCell.classList.add("temp-cool");
        } else if (min < 20) {
            minCell.classList.add("temp-warm");
        } else {
            minCell.classList.add("temp-hot");
        }

        // --- Max sıcaklık ---
        if (max < 10) {
            maxCell.classList.add("temp-cool");
        } else if (max < 20) {
            maxCell.classList.add("temp-warm");
        } else {
            maxCell.classList.add("temp-hot");
        }

        // --- Yağmur bar'ı ---
        // Hücreyi işaretleyelim (CSS için)
        rainCell.classList.add("rain-cell");

        // Hücre içeriğini temizleyip bar ekleyelim
        rainCell.textContent = ""; // "31" yazısını siliyoruz

        const bar = document.createElement("div");
        bar.classList.add("rain-bar");
        bar.textContent = rain + " mm"; // istersen yazıyı da göster

        // Renk sınıfını bar'a ekle
        if (rain < 40) {
            bar.classList.add("rain-low");
        } else if (rain < 70) {
            bar.classList.add("rain-mid");
        } else {
            bar.classList.add("rain-high");
        }

        // Genişlik (ör: 41 -> width: 41%)
        bar.style.width = rain + "%";

        rainCell.appendChild(bar);
    });
});


// tour copy JS
 document.addEventListener('DOMContentLoaded', function () {
  const topCards = document.querySelectorAll('#tourCards .tour-card');
  const bottomContainer = document.querySelector('#copyTours .swiper-wrapper');

  if (!bottomContainer || topCards.length === 0) return;

  topCards.forEach((card, index) => {
    if (index < 6) {
      const clone = card.cloneNode(true);
      clone.classList.add('swiper-slide');
      bottomContainer.appendChild(clone);
    }
  });

  // Swiper'ı BAŞLAT
  const toursSwiper = new Swiper('#copyTours', {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    speed: 600,
    grabCursor: true,

    // breakpoint'ler
    breakpoints: {
      576: { slidesPerView: 1 },
      992: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },

    // boyut değişimlerini otomatik izle
    observer: true,
    observeParents: true,
  });

  // Tüm sayfa + görseller yüklendikten sonra bir kez daha hesaplat
  window.addEventListener('load', () => {
    toursSwiper.update();
  });
});



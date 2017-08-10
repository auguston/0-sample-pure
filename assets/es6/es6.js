const s_public = {
  // 讀取中
  loading() {
    setTimeout(function() {
      $('.js-loading-mask').fadeOut(400);

      setTimeout(function() {
        $('.js-loading-mask').remove();

      }, 400);

    }, 800);
  },
  // 漣漪效果
  btnWaves() {
    Waves.attach('.btn-waves', ['waves-button', 'waves-light']);
    Waves.init();
  }
};


$(window).on({
  load() {
    s_public.loading(); // 讀取中
  }
});

$(function() {
  s_public.btnWaves(); // 漣漪效果
});
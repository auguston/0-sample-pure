var public = {};

// 讀取中
public.loading = function() {
  setTimeout(function() {
    $('.js-loading-mask').fadeOut(400);

    setTimeout(function() {
      $('.js-loading-mask').remove();

    }, 400);

  }, 800);
};

// 漣漪效果
public.btnWaves = function() {
  Waves.attach('.btn-waves', ['waves-button', 'waves-light']);
  Waves.init();
};


$(window).on({
  'load': function() {
    public.loading(); // 讀取中
  }
});

$(function() {
  public.btnWaves(); // 漣漪效果
});
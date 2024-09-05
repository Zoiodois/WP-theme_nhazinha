<?php
if (!isset($attributes['imgURL'])) {
  $attributes['imgURL'] = get_theme_file_uri('/images/nhazinha/banner-pagina-ini-1-.webp');
}

?>

<div class="page-banner">
    <picture>
    <source media="max-width:480px" srcset="<?php echo $attributes['imgURLSWebp']; ?>" type="image/webp">
    <source media="min-width:480px;max-width:960px" srcset="<?php echo $attributes['imgURLMWebp']; ?>" type="image/webp">
    <img class="page-banner__bg-image" src="<?php echo $attributes['imgURLGWebp']; ?>" alt="">
</picture>
  
  <div class="page-banner__content container t-center c-white">
    
    <?php echo $content; ?>
  </div>
</div>

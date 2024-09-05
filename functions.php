<?php
require_once get_template_directory() . '/int/nav__walk.php';

function university_files() {
  //wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key=AIzaSyDin3iGCdZ7RPomFLyb2yqFERhs55dmfTI', NULL, '1.0', true);
  //wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
 // wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
  //wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  wp_enqueue_style('university_main_styles', get_theme_file_uri('style.css'));
  //wp_enqueue_style('university_extra_styles', get_theme_file_uri('style.css'));
  // Enfileirar estilos do tema
  //wp_enqueue_style( 'mytheme-style', get_stylesheet_uri());

}
add_action('wp_enqueue_scripts', 'university_files');

  
//Enqueue content assets but only in the Editor.
//Esse método funcionou
 
function example_enqueue_editor_content_assets() {
  if ( is_admin() ) {
      wp_enqueue_style(
          'example-editor-content-styles',
          get_theme_file_uri('style.css')
      );
  }
}
add_action( 'enqueue_block_assets', 'example_enqueue_editor_content_assets' );


//Bootstrap
function enqueue_bootstrap_assets() {
  // Enfileirando o Bootstrap CSS para o frontend e o editor
  wp_enqueue_style('bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css', array(), '5.3.0', 'all');
  
  // Enfileirando o Bootstrap JS para o frontend
  wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js', array(), '5.3.0', true);

  // Enfileirando o Bootstrap JS para o editor de blocos (Gutenberg)
  add_action('enqueue_block_editor_assets', function() {
      wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js', array(), '5.3.0', true);
  });
}
add_action('wp_enqueue_scripts', 'enqueue_bootstrap_assets');
add_action('enqueue_block_editor_assets', 'enqueue_bootstrap_assets');



function university_features() {
  add_theme_support( 'align-wide' );
  add_theme_support( 'appearance-tools' );
  //add_theme_support( 'border' );
  //add_theme_support( 'custom-line-height' );
  //add_theme_support( 'custom-spacing' );
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_image_size('banner-small', 480, 270, true);  // Tamanho P
  add_image_size('banner-medium', 960, 540, true); // Tamanho M
  add_image_size('banner-large', 1920, 1080, true); // Tamanho G
  //add_image_size('professorLandscape', 400, 260, true);
  //add_image_size('professorPortrait', 480, 650, true);
  //add_image_size('pageBanner', 1500, 350, true);
  add_theme_support('editor-styles');
  add_editor_style(array('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i', 'build/style-index.css', 'build/index.css'));
}
add_action('after_setup_theme', 'university_features');


function portfoliosBlocks() {
  wp_localize_script('wp-editor', 'ourThemeData', array('themePath' => get_stylesheet_directory_uri(),'siteURL' => site_url()));

  register_block_type_from_metadata(__DIR__ .'/build/store');
  register_block_type_from_metadata(__DIR__ .'/build/footer');
  register_block_type_from_metadata(__DIR__ .'/build/header');  //ERROO
  register_block_type_from_metadata(__DIR__ .'/build/banner');
  register_block_type_from_metadata(__DIR__ .'/build/banner_port');
  register_block_type_from_metadata(__DIR__ .'/build/genericbutton');
  register_block_type_from_metadata(__DIR__ .'/build/genericheading');
  register_block_type_from_metadata(__DIR__ .'/build/nhazinhaheading');
  register_block_type_from_metadata(__DIR__ .'/build/nossaagenda');
  register_block_type_from_metadata(__DIR__ .'/build/adjustableimages');
}
add_action('init', 'portfoliosBlocks');
  


// Register a shortcode to use in user-login template.
// Redirects user to wp-login.php 
function redirect_shortcode() {
  wp_redirect(site_url('/wp-login.php'));
  exit();
}
add_shortcode('redirect', 'redirect_shortcode');





//Register Menus
register_nav_menu('main-menu', 'Main menu');




//Image conversion - Workin and Active
function convert_image_to_webp_and_jpeg($metadata, $attachment_id) {
  $upload_dir = wp_upload_dir();
  $attachment_path = get_attached_file($attachment_id);

  // Caminho para a imagem JPEG compactada (fallback)
  $jpeg_path = preg_replace('/\.(jpg|jpeg|png)$/i', '-compressed.jpg', $attachment_path);
  convert_image_to_fallback_jpeg($attachment_path, $jpeg_path);

  // Caminho para a imagem WebP
  $webp_path = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $jpeg_path);
  convert_image_to_webp($jpeg_path, $webp_path);

  // Adiciona URLs WebP e JPEG compactado ao metadata para o tamanho "full"
  if (isset($metadata['sizes']['full'])) {
    $metadata['sizes']['full']['webp_url'] = str_replace($upload_dir['basedir'], $upload_dir['baseurl'], $webp_path);
}

  // Converte todos os tamanhos de imagem para WebP compactado
  foreach ($metadata['sizes'] as $size => $size_info) {
      $size_path = $upload_dir['basedir'] . '/' . dirname($metadata['file']) . '/' . $size_info['file'];
      
      // WebP
      $webp_size_path = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $size_path);
      convert_image_to_webp($size_path, $webp_size_path);

      $metadata['sizes'][$size]['webp_url'] = str_replace($upload_dir['basedir'], $upload_dir['baseurl'], $webp_size_path);
  }

  return $metadata;
}

function convert_image_to_webp($image_path, $webp_path) {
  $imagick = new \Imagick($image_path);
  $imagick->setImageFormat('webp');
  $imagick->stripImage();
  $imagick->writeImage($webp_path);
  $imagick->clear();
  $imagick->destroy();
}

function convert_image_to_fallback_jpeg($image_path, $jpeg_path) {
  $imagick = new \Imagick($image_path);
  $imagick->setImageFormat('jpeg');
  $imagick->setImageCompression(\Imagick::COMPRESSION_JPEG);
  $imagick->setImageCompressionQuality(40); // Define a qualidade da imagem JPEG (ajuste conforme necessário)
  $imagick->stripImage(); // Remove metadados para reduzir o tamanho do arquivo
  $imagick->writeImage($jpeg_path);
  $imagick->clear();
  $imagick->destroy();
}
add_filter('wp_generate_attachment_metadata', 'convert_image_to_webp_and_jpeg', 10, 2);

//Serve the webp images instead the jpeg ones
function serve_images_as_webp($html, $post_id, $post_image_id) {

  if(!is_admin()){

    // Verifica se a URL da imagem é válida
    if (preg_match('/\.(jpg|jpeg|png)$/i', $html, $matches)) {
      // Substitui a extensão da imagem por .webp
      $webp_url = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $html);
      
      // Verifica se o arquivo WebP existe
      $webp_path = str_replace(wp_upload_dir()['baseurl'], wp_upload_dir()['basedir'], $webp_url);
      
      if (file_exists($webp_path)) {
        return str_replace($html, $webp_url, $html);
      }
    }
  }

  return $html;
}

//add_filter('wp_get_attachment_image', 'serve_images_as_webp', 10, 3);
//add_filter('wp_get_attachment_image_src', 'serve_images_as_webp', 10, 3);
//add_filter('wp_get_attachment_url', 'serve_images_as_webp', 10, 3);

function my_custom_image_url($url, $post_id, $size, $icon) {
  error_log('my_custom_image_url chamada com URL: ' . $url);
  // Verifica se o tamanho solicitado é o tamanho original
    // Verifica se a URL é para uma imagem e não um ícone
  if (strpos($url, '.jpg') !== false || strpos($url, '.jpeg') !== false || strpos($url, '.png') !== false) {
      // Substitui a extensão da URL por .webp
      $url = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $url);
  }

         // Adiciona um log para depuração
         error_log("Original URL: $url, Nova URL: $new_url");
         die();
  return $url;

}
//add_filter('wp_get_attachment_url', 'my_custom_image_url', 10, 4);
//add_filter('wp_get_attachment_image', 'my_custom_image_url', 10, 3);
//add_filter('wp_get_attachment_image_src', 'my_custom_image_url', 10, 3);
//error_log('Filtro wp_get_attachment_url registrado.');


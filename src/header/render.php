<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php if ( is_singular() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' ); ?>
    <title>Websites Portfolio</title>
    <?php wp_head(); ?>
</head>


<body>
    <header class="container">
        <div class="spacer" style="height:10px"></div>

        <div class="row mb-3">
            <div class="col">
                <div class="container box">

                    <div class="header-img__ajust">
                        <img src="<?php 
                        $theme_dir = get_template_directory_uri();
                        echo $theme_dir . '/images/nhazinha/logo_nhazinha_extend.webp';?>" 
                        class="img-fluid" style="max-width:100% height:auto">
                    </div>
                </div>
            </div>

            <div class="col" style="    margin-top: 10px;">

                <div class="container">
                    <nav class="navbar navbar-toggler navbar-light no-border">
                        <div class="container-fluid justify-content-end">
                            <!--
                            <a class="navbar-brand" href="#">Menu</a>
-->
                            <button class="navbar-toggler custom-toggler no-border" type="button"
                                data-bs-toggle="collapse" data-bs-target="#main-menu" aria-controls="main-menu"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="main-menu">
                                <?php
            wp_nav_menu(array(
                'theme_location' => 'main-menu',
                'container' => false,
                'menu_class' => '',
                'fallback_cb' => '__return_false',
                'items_wrap' => '<ul id="%1$s" class="navbar-nav me-auto mb-2 mb-md-0 %2$s">%3$s</ul>',
                'depth' => 2,
                'walker' => new bootstrap_5_wp_nav_menu_walker()
            ));
            ?>
                            </div>
                        </div>
                    </nav>

                </div>



            </div>
        </div>

    </header>
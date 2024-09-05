
<div class="container-fluid">
    <div class="row card-container">
        <?php foreach ($attributes['cards'] as $card) {
  
       ?>

        <div>
            <div class="card zoom_mask">
                <div class="transform_hover_up">

                    <div class="d-flex justify-content-center">


                        <img class="card-img-top card-imagem" 
                            src="<?php echo esc_url($card['imgURL']); ?>" alt="Card image">

                    </div>
                    <div class="card-body d-flex flex-column justify-content-start">
                        <h5 class="card-title display-5 lh-lg fc-white text-body-secondary">
                            <?php echo esc_attr($card['imgDescript']); ?></h5>
                        <button class="btn fs-4 saiba-mais-btn">Saiba Mais</button>
                    </div>
                </div>
            </div>
        </div>

        <?php
        } ?>



    </div>

</div>
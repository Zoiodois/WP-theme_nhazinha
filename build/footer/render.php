<?php wp_footer()?>
<div class="container-fluid text-white">
    <div class="row footer_background">
        <div class="col-md-6 col-sm-12 d-flex flex-column justify-content-between">

            <div class="row  p-3">

                <div class="container my-5 text-white">
                    <!-- Titulo e Subtitulo -->
                    <div class="row fs-3 text-uppercase ms-5">Newsletter</div>
                    <div class="row fs-1">
                        <div class="col border-end border-dark-subtle" style="max-width:7%; height: 3,5rem;">
                        </div>
                        <div class="col mr-1 lh-1">Receba todas as nossas novidades em Primeira Mão
                        </div>
                    </div>
                </div>

            </div>
        
<!-- codigo alterado aqui, com is_set e a array atributes -->
            <div class="row  p-3">

                <?php if( isset($attributes['shortcode'])  && !empty($attributes['shortcode'])){
                    $shortcode = sanitize_text_field($attributes['shortcode']);
                    echo do_shortcode($shortcode);

                } else { ?>

                    <form class="p-3 d-flex flex-column " style="width:90%; margin:auto">
                        <input type="email" placeholder="Digite seu email" class="email-input">
                        <button class="btn text-start text-white m-0">Enviar</button>
                     </form>


                <?php } ?>


            </div>

            <span class="row ps-5 fw-light align-items-end">@2024 Rancho Nhazinha. Todos os direitos reservados</span>

        </div>
        <div class="col-md-6 col-sm-12 d-flex flex-column justify-content-between">
            <div class="row footer_logo mt-5 ms-2"></div>
            <div class="row  p-3">Rua Waldemiro Olenik, Quadra 31, Lote 7. Cep: 84050-070, Ponta Grossa - Paraná.</div>
            <div class="row  p-3">contato@ranchonhazinha.com.br</div>
            <a class="btn text-start text-white p-1" href="">Entre em contato conosco</a>
            <div class="row">
                <div class="d-flex">
                    <a href="X"><i class="fab fa-instagram social-icon"></i></a>
                    <a href="X"> <i class="fab fa-facebook-f social-icon"></i></a>
                    <div class="m-auto">
                        Feito com<i style="font-size:20px" class="far fa-heart social-icon"></i>por <b>Rancho
                            Nhazinha</b>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



</body>

</html>

<!--

<form class="p-3 d-flex flex-column "style="width:90%; margin:auto"> 
                <input type="email" placeholder="Digite seu email" class="email-input">
                    <button class="btn text-start text-white m-0">Enviar</button>
                </form>

-->
<?php
  $link = $_GET['url'];
  header('Content-type: text/html; charset=utf-8');
  require_once("php/classes/simple_html_dom.php");
  $html = new simple_html_dom();
  $html->load_file('https://www.avito.ru'.$link);
?>

<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <title>О товаре</title>
  </head>
  <body>
    <div class="container pt-5">
      <div class="row">
        <?php
          foreach ($html->find('div[class=item-view-content]') as $div){
            $title = $div->find('h1[class=title-info-title]',0)->plaintext;
            $img = $div->find('div[class=gallery-imgs-container js-gallery-imgs-container]',0)->src;
            $price = $div->find('span[itemprop=price]',0)->plaintext;
            $info = $div->find('div[class=item-description-text]',0)->plaintext;
            echo "
              <div class='col-sm-6 border p-4'>
                <a href='/avitoItem.php?url=$link'><h3>$title</h3></a>
                <div class='row'>
                  <!--<div class='col-sm-5'>
                    <img src='$img' width='100%'>
                  </div> -->
                  <div class='col-sm-7'>
                    <p>Цена: $price</p>
                  </div>
                  <div class='col-sm-7'>
                    <p>Описание: $info</p>
                  </div>
                </div>
              </div>
            ";
          }
        ?>
      </div>
    
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  </body>
</html>

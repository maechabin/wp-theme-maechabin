<?php
if ( is_singular() ){
  $header_custom = get_post_meta($post->ID, 'header_custom', true);
  if ( $header_custom ) {
    echo $header_custom;
  }
}

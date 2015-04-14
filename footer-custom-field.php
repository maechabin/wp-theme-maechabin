<?php
if (is_singular()) {
  $footer_custom = get_post_meta($post->ID, 'footer_custom', true);
  if ($footer_custom) {
    echo $footer_custom;
  }
}

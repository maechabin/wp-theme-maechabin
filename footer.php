<?php wp_footer(); ?>
<?php get_template_part('footer-custom-field'); ?>

  <?php if (is_single()): ?>
    <script src="/wp-includes/js/comment-reply.min.js" async></script>
    <script src="https://cdn.jsdelivr.net/gh/google/code-prettify/loader/run_prettify.js?lang=css" async></script>
  <?php endif ?>
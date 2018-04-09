<?php wp_footer(); ?>
<?php get_template_part('footer-custom-field'); ?>

  <?php if (is_single()): ?>
    <script src="/wp-includes/js/comment-reply.js?ver=20090102" async></script>
    <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=css" async></script>
  <?php endif ?>
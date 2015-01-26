<!-- ▼footer▼ -->
<footer>
<div id="footer_sub">

<div class="blog_info">
<p>Powered by <a href="http://ja.wordpress.org/" target="_blank">WordPress</a></p>
<address>Copyright &copy; <a href="<?php echo home_url( '/' ) ?>"><?php bloginfo( 'name' ); ?></a> <a title="Googleプロフィールへ" href="https://plus.google.com/105642680110503345013?rel=author" target="_blank"><img src="http://ssl.gstatic.com/images/icons/gplus-16.png" alt="⇒Googleプロフィールへ" height="16" width="16"></a></li>
</address>
</div>

</div><!-- #footer_sub -->
</footer>
<!-- ▲footer▲ -->

<div id="footer_bar">
<p class="back-to-top"><a href="#TOP"><i class="fa fa-chevron-circle-up"></i>ページ上部に戻る</a></p>
</div>


</div><!-- #index -->

<?php wp_footer(); ?>
<script src="/wp-content/themes/chabin/js/function.js"></script>
<?php if(is_single()): ?>
<script defer src="/wp-includes/js/comment-reply.js?ver=20090102"></script>
<script src="//google-code-prettify.googlecode.com/svn/trunk/src/prettify.js"></script>
<script src="//google-code-prettify.googlecode.com/svn/trunk/src/lang-css.js"></script>
<script>window.setTimeout(prettyPrint, 1000);</script>
<?php endif ?>
</body>

</html>
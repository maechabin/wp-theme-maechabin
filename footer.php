<!-- ▼footer▼ -->
<footer>
<div class="footer">
<div id="footer_sub" class="footer__sub">

<address class="footer__credit">
	Copyright &copy; <a href="<?php echo home_url( '/' ) ?>">maechabin</a>
	<a title="Googleプロフィールへ" href="https://plus.google.com/105642680110503345013?rel=author" target="_blank"><img src="//ssl.gstatic.com/images/icons/gplus-16.png" alt="Googleプロフィールへ" height="16" width="16"></a>
</address>

</div><!-- #footer_sub -->
</div>

<div id="footer_bar" class="footer__bar">
	<p class="footer__bar--link"><a href="#TOP"><i class="fa fa-chevron-circle-up"></i>ページ上部に戻る</a></p>
</div>

</footer>
<!-- ▲footer▲ -->

</div><!-- #index -->

<?php wp_footer(); ?>
<?php if(is_single()): ?>
<script src="/wp-includes/js/comment-reply.js?ver=20090102" defer></script>
<script src="//google-code-prettify.googlecode.com/svn/trunk/src/prettify.js"></script>
<script src="//google-code-prettify.googlecode.com/svn/trunk/src/lang-css.js"></script>
<script>window.setTimeout(prettyPrint, 500);</script>
<?php endif ?>
<?php get_template_part('footer-custom-field'); ?>
<script src="/wp-content/themes/chabin/assets/function.min-5b6cc99cddeb64a3ec72c13be26fa571.js" defer></script>
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-16293533-1', 'auto');
ga('require', 'displayfeatures');
ga('send', 'pageview');
ga('require', 'linkid', 'linkid.js');
</script>
</body>

</html>
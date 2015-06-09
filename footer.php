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
	<ul>
		<li class="footer__bar-link footer__bar-link--left footer__style--hidden" id="footer__bar__agenda-link"><a href="#agenda"><i class="fa fa-chevron-circle-up"></i>目次に戻る</a></li>
		<li class="footer__bar-link footer__bar-link--right"><a href="#TOP"><i class="fa fa-chevron-circle-up"></i>ページ上部に戻る</a></li>
	</ul>
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
<script src="/wp-content/themes/chabin/assets/function.min-e7b8d77d2be1b71873609f1b238a840c.js" defer></script>
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

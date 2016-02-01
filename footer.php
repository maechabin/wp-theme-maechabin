	<!-- ▼footer▼ -->
	<footer>
		<div class="footer">
			<div id="footer_sub" class="footer__sub">

				<ul class="footer__share-button">
					<li class="footer__share-button--list">
						<a href="http://www.facebook.com/maechabin" target="_blank" class="footer__share-button--fb">
							<i class="fa fa-facebook"></i>
						</a>
					<li>
					<li class="footer__share-button--list">
						<a href="https://twitter.com/maechabin" target="_blank" class="footer__share-button--tw">
							<i class="fa fa-twitter"></i>
						</a>
					</li>
					<li class="footer__share-button--list">
						<a href="https://plus.google.com/105642680110503345013?rel=author" target="_blank" class="footer__share-button--gp">
							<i class="fa fa-google-plus"></i>
						</a>
					</li>
				</ul>

				<address class="footer__credit">
					Copyright &copy; <a href="/">maechabin</a>
				</address>

			</div><!-- #footer_sub -->
		</div>

		<div id="footer_bar" class="footer__bar">
			<ul>
				<li class="footer__bar-link footer__bar-link--left footer__style--hidden" id="footer__bar__agenda-link">
					<a href="#agenda">
						<i class="fa fa-chevron-circle-up"></i>目次に戻る
					</a>
				</li>
				<li class="footer__bar-link footer__bar-link--right">
					<a href="#TOP">
						<i class="fa fa-chevron-circle-up"></i>ページ上部に戻る
					</a>
				</li>
			</ul>
		</div>

	</footer>
	<!-- ▲footer▲ -->

</div><!-- #index -->

<?php wp_footer(); ?>
<?php if (is_single()): ?>
<script src="/wp-includes/js/comment-reply.js?ver=20090102" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/run_prettify.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/lang-css.min.js"></script>
<?php endif ?>
<?php get_template_part('footer-custom-field'); ?>
<script src="/wp-content/themes/chabin/assets/function.min-cac35b9d38655f3f2954fbbd65b8564e.js" defer></script>
<script>
$(document).ready(function () {
	$(".cb-share").cbShareCount();
});
</script>
<?php if (is_single()): ?>
<script>window.setTimeout(prettyPrint, 500);</script>
<?php endif ?>
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

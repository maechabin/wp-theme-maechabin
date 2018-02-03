<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<?php wp_footer(); ?>
<?php get_template_part('footer-custom-field'); ?>
<script src="/wp-content/themes/chabin/assets/function.min-4dc7fe216e5195e5c1fbbd06796a5a2d.js" defer></script>

<?php if (is_single()): ?>
	<script src="/wp-includes/js/comment-reply.js?ver=20090102" defer></script>
	<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=css"></script>
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/lang-css.min.js"></script> -->
	<script>
		/*
		$(document).ready(function () {
			$('.slideshowad-images').slideShowAd({
				interval: 8000,
				targetBlank: true
			});
		});
		*/
	</script>
<?php endif ?>
<script>
	/*
	$(document).ready(function () {
		$('.cb-share').cbShareCount({
			assign: ['fb', 'hb', 'pk'],
			cacheTime: 360000
		});
	});
	*/
</script>
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

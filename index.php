<?php
	$content1 = file_get_contents('http://yahoo.com');
	$content2 = file_get_contents('http://mail.ru');
?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Cutterjs</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="cutter.js"></script>
</head>
<body>
<div id="example1">
	<?php echo $content1; ?>
</div>
<div id="example2">
	<?php echo $content2; ?>
</div>
<script>
	var $lastDeleted;
	// custom initialization
	var $a = $('#example1')
		.cutter('init', {
			afterCut: function(a) {$lastDeleted = a;},
			mouseOver: function(a) {
				a.data('border', a.css('border'));
				a.css('border', 'dotted gray 1px');
			},
			mouseOut: function(a) {
				a.css('border', a.data('border'));
			},
			onCut: function(a) {
				a.data('background', a.css('background'));
				a.css('background', 'black');
			},
			onRestore: function(a) {
				a.css('background', a.data('background'));
			}
		})
		.cutter('stop')
		.cutter('start');

	// default initialization
	var $b = $('#example2').cutter('init').cutter('stop').cutter('start');

	setTimeout(function(){
		// debug deleted items
		console.log($a.cutter('deleted'));
		console.log($b.cutter('deleted'));
	}, 5000);

	setTimeout(function(){
		// restore last
		$a.cutter('restore', $lastDeleted);
		// restore all
		$b.cutter('restore');
	}, 6000);
</script>
</body>
</html>
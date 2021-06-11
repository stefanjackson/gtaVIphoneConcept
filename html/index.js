$(function () {
	function display(bool) {
		if (bool) {
			$("#container").show();
		} else {
			$("#container").hide();
		}
	}
	display(false);
	window.addEventListener("message", function(event) {
		var item = event.data;
		if (item.type === "ui") {
			if (item.status == true) {
				display(true);	
			} else {
				display(false);
			}
		} 
	})

	document.onkeyup = function (data) {
		if (data.which == 27) {
			$.post("http://phoneconcept/exit", JSON.stringify({}));
			return;
		}
	}

	document.getElementById('exitPhone').onclick = function (data) {
			$.post("http://phoneconcept/exit", JSON.stringify({}));
			return;	
	}

	$("#close").click(function() {
		$.post("http://phoneconcept/exit", JSON.stringify({}));
		return;
	})

	$("#submit").click(function() {
		let inputValue = $("#input").val();
		if (inputValue.length >= 100) {
			$.post("http://phoneconcept/error", JSON.stringify({
				error: "Input was greater than 100 char."
			}))
			return;
		} else if (!inputValue) {
			$.post("http://phoneconcept/error", JSON.stringify({
				error: "There was no input in the field"
			}))
			return
		}
		$.post("http://phoneconcept/main",  JSON.stringify({
			text: inputValue
		}))
		return;
	})
})
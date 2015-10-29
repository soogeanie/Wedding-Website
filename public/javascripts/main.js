$(document).ready(function() {
  // Setting Background Image to Window Height
  var windowHeight = $(window).height();

  var setHeights = function() {
    $('.home').height(windowHeight);
  };

  setHeights();

  // If you are coming to the wedding
  // show the plus one checkboxes
  $('.response').change(function() {
    value = $(this).val();

    if(value === "true") {
      $('#plus-one, #diet-restrictions').show();
      $('#plus-one-decline').prop('checked', false);
    } else {
      $('#plus-one, #diet-restrictions').hide();
      $('#plus-one-decline').prop('checked', true);
    }
  });

  // If you are bringing a plus one
  // show the plus one name field
  $('.plus-one').change(function() {
    value = $(this).val();

    if(value === "true") {
      $('#plus-one-full-name, #plus-one-diet-restrictions').show();
    } else {
      $('#plus-one-full-name, #plus-one-diet-restrictions').hide();
    }
  });

  // RSVP Form
  $form = $("form");

  if($form.length) {
    $("form").validate({
      errorPlacement: function(error, element) {
        error.appendTo( element.closest(".form-group") );
      }
    });

    $("form").submit(function(event) {
      event.preventDefault();

      if($(this).valid()) {
        $('#submit').attr('disabled', true);

        attributes = $(this).serializeJSON();

        request = $.ajax({
          async: true,
          cache: false,
          data: attributes,
          method: "POST",
          url: "https://rsvp-manager.herokuapp.com/confirmations"
        });

        request.done(function(response) {
          $('.rsvp-form').hide();
          $('.rsvp-thankyou').show();
        });

        request.always(function(response) {
          $('#submit').attr('disabled', false);
        });
      }
    });
  }

  // Changing hamburger to x when dropdown menu is open
  var toggles = document.querySelectorAll(".hamburger, .navbar-header");

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  }

  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    });
  }
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

  $.validator.setDefaults({
    debug: true,
    success: "valid"
  });

  $('form').validate({
      rules: {
          email: {
              required: true,
              email: true
          }
      }
  })

$("#uname").keyup(function (event) {
    jQuery.post('http://localhost:5000/userCheck', { "userCheck" : this.value}).done(function () {
        let field = document.getElementById("uname")
        $(".popover-body").text("Username is available!")
        $(".popover").css("border-color", "#dc3545")
        // field.dataset.bsContent = "Username is available!"
        // buildPopover()
        $(this).click()
    }).fail(function () {
        let field = document.getElementById("uname")
        $(".popover").css("border-color", "#198754")
        $(".popover-body").text("Please Enter a Valid Username")
        // field.dataset.bsContent = "Please Enter a Valid Username"
        // buildPopover()
        $(this).click()
    })
})

function buildPopover() {
    let userEl = document.getElementById("uname")
    let popover = new bootstrap.Popover(userEl, {
        trigger: 'focus'
      })
}

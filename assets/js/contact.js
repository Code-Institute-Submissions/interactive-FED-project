function sendMail(contactForm) {
    emailjs.send("gmail", "BrewFinder", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "from_subject": contactForm.subject.value,
        "from_message": contactForm.message.value,
    })
    .then(
        function(response) {
            console.log("Email sent")
        },
        function(error) {
            console.log("Email submition failed:", error)
        })

    $("#form-name").val("");
    $("#form-email").val("");
    $("#form-subject").val("");
    $("#form-message").val("");
    $('#send-sucess').removeClass('hidden');
    return false
}
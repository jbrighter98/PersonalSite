// Send form to google sheet

const scriptURL = 'https://script.google.com/macros/s/AKfycbzl_Gj5ILPcmxz0jgFoiPtlVd2sesUYvhlmTpPA8Bvx2wMyUoeKjqe_NI3w-ptjFT5y/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    document.getElementById('timestamp').value = new Date().toISOString();
    msg.innerHTML = "Sending..."
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message Sent! I will get back to you soon."
            msg.style.color = "#61b752"
            setTimeout(function() {
                msg.innerHTML = ""
                msg.style.color = "#fff"
            }, 5000)
            form.reset()
        })
        .catch(error => {
            console.error('Error!', error.message)
            msg.innerHTML = "Failed to send message. Please refresh an try again."
            msg.style.color = "#cb1a1a"
            setTimeout(function() {
                error.innerHTML = ""
                msg.style.color = "#fff"
            }, 5000)
        })
})
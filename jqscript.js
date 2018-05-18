$(document).ready(function () {
    $('p').css('color', 'red');

    $('.para').on('click', function () {
        // this === <p class="para"></p>
        console.log(this)

        $(this).fadeOut(4000);
    });

});
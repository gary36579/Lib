$(document).on('keyup', 'input[uppercase]', function () {
    this.value = this.value.toUpperCase();
});

$(document).on('keyup', 'input[lowercase]', function () {
    this.value = this.value.toLowerCase();
});
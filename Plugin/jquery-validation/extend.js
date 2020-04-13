$.validator.methods.floatDigits = function (value, element, param) {
    return this.optional(element) || new RegExp("(^\\d+$)|(^\\d+[.]\\d{" + param + "}$)", "g").test(value);
};
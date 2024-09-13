export const RegexName = new RegExp( /^[a-zA-Z ]+(?:\s[a-zA-Z ]+)*$/);
export const RegexHouseNo = new RegExp(/^[A-Za-z\d_-][A-Za-z0-9\d_-]*([/-]?[A-Za-z0-9]([/-]?[\da-zA-Z]+)?)?$/);
export const RegexEmail = new RegExp(/^(?!.*?\.\.)(?!.*?\.(_|_\.|\._))([a-zA-Z0-9]+[a-zA-Z]*)(?:[._][a-zA-Z0-9]+)?(?:[._]?[a-zA-Z0-9]+)?@[a-zA-Z.]+(?:_[a-zA-Z0-9]+)?\.[a-zA-Z]{2,3}$/);
export const RegexMobileNo = new RegExp(/^[6-9][0-9]{9}$/);
export const RegexPincode=new RegExp(/^[1-9]{1}[0-9]{5}$/);
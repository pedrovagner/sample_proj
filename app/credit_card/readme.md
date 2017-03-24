# Credit Card Validator

This is a Django application used to validate a text file data submitted by an user.

## File Format

User submitted file must be in the following format:

* The first line of input contains an integer N (0 < N < 100).
* The next N lines contain credit card numbers.

A valid credit card has the following characteristics: 

* It must start with a 4, 5 or 6. 
* It must contain exactly 16 digits. 
* It must only consist of digits (0-9). 
* It may have digits in groups of 4, separated by one hyphen "-". 
* It must NOT use any other separator like ' ' , '_', etc. 
* It must NOT have 4 or more consecutive repeated digits.

Sample Input File

```
6
4123456789123456
5123-4567-8912-3456
61234-567-8912-3456
4123356789123456
5133-3367-8912-3456
5123 - 3567 - 8912 - 3456
```

Sample Output

```
Valid
Valid
Invalid
Valid
Invalid
Invalid
```

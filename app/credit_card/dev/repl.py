import re


digits = ''.join(['2', '-', '1', ' ', '1', '5', 'a', '2', '3'])

digits = '5222-2437-3254-3353'
digits = '5222-2237-3254-3353'

re.fullmatch(r'[4-6]\d{3}(-?)\d{4}\1\d{4}\1\d{4}', digits)
re.findall(r'(\d)(-?\1){3,}', digits)

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from .forms import ValidationForm


class CreditCardValidation(TestCase):
    def setUp(self):
        self.file = SimpleUploadedFile('Foo List.txt', b'''13
4123456789123456
5123-4567-8912-3456
61234-567-8912-3456
4123356789123456
5133-3367-8912-3456
5123 - 3567 - 8912 - 3456
42536258796157867
4424444424442444
5122-2368-7954 - 3214
44244x4424442444
0525362587961578
51222368-7954-3214
5122-2368-79543214
''')

    def test_file_field(self):
        """Test file format and credit card numbers."""
        form = ValidationForm({}, {'file': self.file})
        self.assertTrue(form.is_valid())
        self.assertListEqual(form.results, ['valid', 'valid', 'invalid', 'valid',
            'invalid', 'invalid', 'invalid', 'invalid', 'invalid', 'invalid',
            'invalid', 'invalid', 'invalid'])

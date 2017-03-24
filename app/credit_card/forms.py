import re
from django import forms


class ValidationForm(forms.Form):
    file = forms.FileField(label="Data File", help_text="Credit card list.")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Stores the file content (if valid)
        self.content = None  # type: str
        # Stores the cards checks ('valid' or 'invalid')
        self.results = []

    def clean_file(self):
        data = self.cleaned_data['file']

        if data.size > 50 * 1000:
            raise forms.ValidationError("File size is greater than 50 KB.")
        try:
            self.content = str(data.read(), 'utf-8')
        except UnicodeDecodeError:
            raise forms.ValidationError("File type isn't utf-8.")

        self.validate_card_list()
        return data

    def validate_card_list(self):
        """
        The first line of input contains an integer N (0 < N < 100)
        The next N lines contain credit card numbers. Each one:
            - Must start with a 4, 5 or 6.
            - Must contain exactly 16 digits.
            - Must only consist of digits (0-9).
            - May have digits in groups of 4, separated by one hyphen "-".
            - Must NOT use any other separator like ' ' , '_', etc.
            - Must NOT have 4 or more consecutive repeated digits.
        """
        assert isinstance(self.content, str)
        lines = iter(self.content.splitlines())
        try:
            quantity = int(next(iter(lines), ''))
        except ValueError:
            raise forms.ValidationError("Invalid file format: Credit card"
                                        " quantity invalid.")
        if not 0 < quantity < 100:
            raise forms.ValidationError("Credit card quantity out of range.")

        for card in lines:
            if not re.fullmatch(r'[4-6]\d{3}(-?)\d{4}\1\d{4}\1\d{4}', card) or \
                    re.search(r'(\d)(-?\1){3,}', card):
                self.results.append('invalid')
                continue
            self.results.append('valid')

        if quantity != len(self.results):
            raise forms.ValidationError("Invalid credit card quantity.")

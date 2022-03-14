from django import forms

class LinkLoginForm(forms.Form):
    public_token = forms.CharField(label='public_token', max_length=500)

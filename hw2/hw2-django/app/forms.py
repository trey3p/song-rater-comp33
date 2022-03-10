from django import forms
from django.forms import ModelForm
from app.models import User, Album

class NameForm(forms.Form):
    your_name = forms.CharField(label='Your name', max_length=100)


class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password']


class RatingForm(forms.Form):
    user = forms.CharField(label = 'User', max_length=255)


class AlbumForm(ModelForm):
    class Meta:
        model = Album
        fields = ['name']


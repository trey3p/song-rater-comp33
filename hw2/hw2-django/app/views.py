from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.contrib import messages
# Create your views here.

from .models import Rating, Album
from .forms import RatingForm, UserForm, AlbumForm

def index(request):
    return HttpResponse("Hello world. You're at the songRater index.")


def homepage(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = UserForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            user = form.save()
            messages.success(request, "Registration successful!")
            return render(request, 'index.html', {'UserForm': UserForm, 
                                        'RatingForm': RatingForm})

        messages.error(request, 'Registration unsuccessful.')
    # if a GET (or any other method) we'll create a blank form
    elif request.method == 'GET':
        form = RatingForm(request.GET)

        if form.is_valid():
            
            ratings = Rating.objects.filter(username = form.cleaned_data.get('user'))

            return render(request, 'index.html', {'UserForm': UserForm,
                                                'RatingForm': RatingForm,
                                                'ratings': ratings})



    return render(request, 'index.html', {'UserForm': UserForm, 
                                        'RatingForm': RatingForm})

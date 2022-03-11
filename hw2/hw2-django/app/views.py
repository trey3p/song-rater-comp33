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
                                        'RatingForm': RatingForm,
                                        'AlbumForm': AlbumForm})
        else:

            messages.error(request, 'Registration unsuccessful.')
    
    elif request.method == 'GET' and 'Retrieve' in request.GET:
        form = RatingForm(request.GET)

        if form.is_valid():
            
            ratings = Rating.objects.filter(username = form.cleaned_data.get('user'))
            
            if ratings:
                return render(request, 'index.html', {'UserForm': UserForm,
                                                'RatingForm': RatingForm,
                                                'AlbumForm': AlbumForm,
                                                'ratings': ratings})
            else:

                messages.error(request, 'Retrieval unsuccesful, invalid information!')
        else:

                messages.error(request, 'Retrieval unsuccesful, invalid information!')


    elif request.method == 'GET' and 'Search' in request.GET:
        form = AlbumForm(request.GET)

        if form.is_valid():

            albums = Album.objects.filter(name = form.cleaned_data.get('albumName'))

            if albums:
                return render(request, 'index.html', {'UserForm': UserForm, 
                                        'RatingForm': RatingForm,
                                        'AlbumForm': AlbumForm,
                                        'albums': albums})

            else:

                messages.error(request, 'Search unsuccessful, invalid information!')
        else:

                messages.error(request, 'Search unsuccessful, invalid information!')

       




    return render(request, 'index.html', {'UserForm': UserForm, 
                                        'RatingForm': RatingForm,
                                        'AlbumForm': AlbumForm})




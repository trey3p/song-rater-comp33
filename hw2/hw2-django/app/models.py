from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length = 255, primary_key = True)
    password = models.CharField(max_length = 255)


class Artist(models.Model):
    song = models.CharField(max_length = 255, primary_key = True)
    artist = models.CharField(max_length = 255)

    def str(self):
        return '%s by %s' % (self.song, self.artist)

    def strArtist(self):
        return '%s' % self.artist

    
class Rating(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Artist, on_delete=models.CASCADE)
    rating = models.IntegerField()
    review = models.CharField(max_length = 1000, default = str)

    def str(self):
       return '%s --> %s \n %s' % (self.song.str(), self.rating, self.review)



class Album(models.Model):
    name = models.CharField(max_length = 255, primary_key = True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    songs = models.JSONField(default = list[str])
    releaseDate = models.DateField()

    def str(self):
        s =''
        for song in self.songs:
            s += song + '\n'

        return '%s by %s was released on %s.' % (self.name, 
                                                self.artist.strArtist(),
                                                self.releaseDate)






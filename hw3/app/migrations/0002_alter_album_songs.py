# Generated by Django 4.0.3 on 2022-04-14 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='songs',
            field=models.JSONField(default=list),
        ),
    ]

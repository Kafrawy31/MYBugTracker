# Generated by Django 4.1.7 on 2023-04-18 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BugTracker', '0011_alter_devuser_userproject'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='TicketDateAssigned',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]

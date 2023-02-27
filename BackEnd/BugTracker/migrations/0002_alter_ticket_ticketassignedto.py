# Generated by Django 4.1.7 on 2023-02-27 12:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BugTracker', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='ticketassignedto',
            field=models.ForeignKey(blank=True, default='-', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='assignedto', to='BugTracker.devuser'),
        ),
    ]
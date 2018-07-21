from django.urls import path

from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from django.views.generic import TemplateView


urlpatterns = [
    url(r'^project$', TemplateView.as_view(template_name="index.html")),
    url(r'^login$', TemplateView.as_view(template_name='Login.html')),
    url(r'^home$', TemplateView.as_view(template_name='home.html')),
    url(r'^$', TemplateView.as_view(template_name='home.html')),

    url(r'^api/post_login$', views.post_login, name='post_login'),
    url(r'^api/post_signup$', views.post_signUp, name='post_signUp'),
    url(r'^api/post_logout$', views.post_logout, name='logout'),
    url(r'^api/post_experimentSearch$', views.post_experimentSearch, name='post_experimentSearch'),
    url(r'^api/post_userInfo$', views.post_userInfo, name='post_userInfo'),
]
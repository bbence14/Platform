from .api import ListViewSet
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from django.views.decorators.csrf import ensure_csrf_cookie

router = DefaultRouter()
router.register(r'GE', ListViewSet)

urlpatterns = router.urls
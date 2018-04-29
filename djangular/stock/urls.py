from .api import ListViewSet, TestClass
from rest_framework.routers import SimpleRouter

from django.views.generic import TemplateView
from django.views.decorators.csrf import ensure_csrf_cookie

router = SimpleRouter()
router.register(r'GE', ListViewSet)
router.register(r'Predict', TestClass, base_name='updatetime')

urlpatterns = router.urls


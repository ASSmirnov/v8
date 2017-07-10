# -*-coding: utf-8-*-
import datetime
import random
import time
import hashlib
from django.http import JsonResponse
from django.views.generic import View


class MenuAPI(View):

    def get(self, request):
        return JsonResponse([
          {"label": u"Тестовые страницы",
           "items": [
              {"label": u"Тест модалок",       "module": "core",   "view": "modal_test"},
              {"label": u"Топливо и скорость", "module": "core",   "view": "fuel_speed_chart"},
              {"label": u"Отчет о топливе",    "module": "core",   "view": "fuel_report"},
          ]
          },
          {"label": u"Отчеты",
           "items": [
               {"label": u"Отчет о топливе", "module": "core", "view": "fuel_report"},
               {"label": u"Остановки"},
               {"label": u"Заправки"},
               {"label": u"Производственные операции детализированные по экскаваторам"},
               {"label": u"Сводный отчет о работе разреза"},
               {"label": u"Аналитика", "items":[
                   {"label": u"Эксплуатация экскаваторов"},
                   {"label": u"Эксплуатация самосвалов"},
               ]},
           ]
           },
          {"label": u"Шины"},
          {"label": u"Топливозаправщики"},
          {"label": u"Топливные карты",},
          {"label": u"Справочники"},
          {"label": u"Буровые станки"},
          {"label": u"Администрирование"},
          {"label": u"Графики", "items": [
              {"label": u"Топливо и скорость", "module": "core", "view": "fuel_speed_chart"},
              {"label": u"Аналитические параметры"}
          ]
          },

      ], safe=False)


class FuelSpeedChartAPI(View):

    def get(self, request):
        begin = request.GET.get("from")
        # begin = begin and datetime.datetime.strptime(begin, "%d.%m.%Y %H:%M") or datetime.datetime.now()

        end = request.GET.get("to")
        # end = end and datetime.datetime.strptime(end, "%d.%m.%Y %H:%M") or (begin + datetime.timedelta(minutes=100))

        print "#####", begin, end
        return JsonResponse([], safe=False)


class FuelSpeedReportAPI(View):

    def get(self, request):
        data = []
        for i in range(-20, 100):
            date = datetime.datetime.now() + datetime.timedelta(minutes=i)
            data.append(dict(date=date.strftime("%m/%d/%Y %H:%M:%S"),
                             fuel1=random.randint(0, 4000),
                             fuel2=random.randint(0, 4000),
                             fuel3=random.randint(0, 4000),
                             fuel4=random.randint(0, 4000),
                             speed=random.randint(0, 120),
                             driver=random.choice([u"Иванов А.А.", u"Петров В.С.", u"Сидоров Р.Е."])
                             ))
        return JsonResponse(data, safe=False)


class VehiclesAPI(View):

    def get(self, request):
        data = []

        for i in range(200):
            kind = random.choice(["truck", "shov", "dozer", "refueller", "drill"])
            veh = dict(name="%s %s" % (kind.capitalize(), i),
                       id=i,
                       kind=kind)
            data.append(veh)

        return JsonResponse(data, safe=False)
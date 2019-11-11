def handleCheckBatmobileRegistered(carid, db):
   for item in db:
      if (item['type'] == 'batmobile'):
         if (item['carid'] == carid):
            return '{status : registered}'
   return '{status: unregistered}'

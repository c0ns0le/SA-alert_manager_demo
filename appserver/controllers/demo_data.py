import logging
import os
import sys
import json
import shutil
import cherrypy
import re
import time
import datetime
import urllib

#from splunk import AuthorizationFailed as AuthorizationFailed
import splunk.appserver.mrsparkle.controllers as controllers
import splunk.appserver.mrsparkle.lib.util as util
import splunk.bundle as bundle
import splunk.entity as entity
from splunk.appserver.mrsparkle.lib import jsonresponse
from splunk.appserver.mrsparkle.lib.util import make_splunkhome_path
import splunk.clilib.bundle_paths as bundle_paths
from splunk.util import normalizeBoolean as normBool
from splunk.appserver.mrsparkle.lib.decorators import expose_page
from splunk.appserver.mrsparkle.lib.routes import route
import splunk.rest as rest

dir = os.path.join(util.get_apps_dir(), __file__.split('.')[-2], 'bin')

if not dir in sys.path:
    sys.path.append(dir)


#sys.stdout = open('/tmp/stdout', 'w')
#sys.stderr = open('/tmp/stderr', 'w')    


def setup_logger(level):
    """
    Setup a logger for the REST handler.
    """

    logger = logging.getLogger('splunk.appserver.alert_manager.controllers.DemoData')
    logger.propagate = False # Prevent the log messages from being duplicated in the python.log file
    logger.setLevel(level)

    file_handler = logging.handlers.RotatingFileHandler(make_splunkhome_path(['var', 'log', 'splunk', 'alert_manager_demodata_controller.log']), maxBytes=25000000, backupCount=5)

    formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    return logger

logger = setup_logger(logging.DEBUG)

from splunk.models.base import SplunkAppObjModel
from splunk.models.field import BoolField, Field



class DemoData(controllers.BaseController):


    @expose_page(must_login=True, methods=['POST']) 
    def toggle_search(self, search_name, action, **kwargs):
        user = cherrypy.session['user']['name']
        sessionKey = cherrypy.session.get('sessionKey')

        if action == 'enable':
            uri = '/servicesNS/nobody/SA-alert_manager_demo/saved/searches/%s/enable' % search_name
            serverResponse, serverContent = rest.simpleRequest(uri, sessionKey=sessionKey, method='POST')
            logger.info("Enabled search=%s", search_name)   

            return 'Alert %s has been enabled' % search_name
        else:
            uri = '/servicesNS/nobody/SA-alert_manager_demo/saved/searches/%s/disable' % search_name
            serverResponse, serverContent = rest.simpleRequest(uri, sessionKey=sessionKey, method='POST')
            logger.info("Disabled search=%s", search_name)   

            return 'Alert %s has been disabled' % search_name


    @expose_page(must_login=True, methods=['GET']) 
    def load_demo_data(self, **kwargs):
        logger.info("Load demo data")   

        return 'Demo data has been loaded'


    @expose_page(must_login=True, methods=['GET']) 
    def clear_demo_data(self, contents, **kwargs):
        logger.info("Clear demo data")   

        return 'Demo data has been cleared'


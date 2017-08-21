import os

class config:

    contentPath = (os.environ['CONTENT_PATH'] + '/').replace('//', '/') if 'CONTENT_PATH' in os.environ else os.environ['HOME'] + '/blogdown/'

    sync = {
        'git': {
            'repo': os.environ['GIT_REPO'] if 'GIT_REPO' in os.environ else 'https://github.com/thingdown/docs',
            'branch': os.environ['GIT_BRANCH'] if 'GIT_BRANCH' in os.environ else 'master'
        }
    }

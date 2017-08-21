import git
import os
import shutil
from git import Git, Repo
from api.config import config

def sync(system):
    if system == 'git':
        message = __sync_git()
        return {
            'message': message
        }
    return {
        'message': 'Invalid system'
    }

def __sync_git():
    message = ''
    repo = {}
    os.popen('''mkdir -p /tmp/backdown/content/
    mv ''' + config.contentPath + '''* /tmp/backdown/content/
    mv ''' + config.contentPath + '''.* /tmp/backdown/content/
    ''')
    try:
        repo = Repo.clone_from(config.sync['git']['repo'], '/tmp/backdown/content/')
        message = config.sync['git']['repo'] + ' cloned'
    except git.GitCommandError as e:
        if 'already exists and is not an empty directory' in e.stderr:
            repo = Repo('/tmp/backdown/content/')
            repo.remotes.origin.pull()
            message = config.sync['git']['repo'] + ' pulled'
        else:
            raise e
    os.popen('''mv /tmp/backdown/content/* ''' + config.contentPath + '''
    mv /tmp/backdown/content/.* ''' + config.contentPath + '''
    rm -rf /tmp/backdown/content/
    ''')
    return message

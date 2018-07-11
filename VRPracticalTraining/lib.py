from .settings import DEBUG
import sys


def DEBUG_Print(value, *, sep=' ', end='\n', file=sys.stdout, flush=False):
    if(DEBUG):
        print(value, sep, end, file, flush)

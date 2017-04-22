import operator
from django.db import models
from django.contrib.admin.utils import lookup_needs_distinct
from functools import reduce


def get_search_results(queryset, search_fields, search_term):
    """
    Returns a tuple containing a queryset to implement the search,
    and a boolean indicating if the results may contain duplicates.
    """

    # Apply keyword searches.
    def construct_search(field_name):
        if field_name.startswith('^'):
            return "%s__istartswith" % field_name[1:]
        elif field_name.startswith('='):
            return "%s__iexact" % field_name[1:]
        elif field_name.startswith('@'):
            return "%s__search" % field_name[1:]
        else:
            return "%s__icontains" % field_name

    use_distinct = False
    if search_fields and search_term:
        orm_lookups = [construct_search(str(search_field))
                       for search_field in search_fields]
        for bit in search_term.split():
            or_queries = [models.Q(**{orm_lookup: bit})
                          for orm_lookup in orm_lookups]
            queryset = queryset.filter(reduce(operator.or_, or_queries))
        # if not use_distinct:
        #     for search_spec in orm_lookups:
        #         if lookup_needs_distinct(self.opts, search_spec):
        #             use_distinct = True
        #             break

    return queryset

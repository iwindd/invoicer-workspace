import dayjs = require('dayjs');
import { Filter, Pagination, SortDirection, SortItem } from './type';

export const filter = (
  filter: Filter,
  rows: string[],
  include?: (text: string) => any,
) => {
  try {
    const text = filter?.quickFilterValues?.[0];
    const items = filter?.items || [];
    const currentTime = dayjs();

    if (!text && items.length <= 0) return null;

    return {
      OR: [
        /* TEXT */
        ...(text
          ? [
              ...rows.map((name: string) => ({
                [`${name}`]: {
                  contains: filter?.quickFilterValues?.[0],
                  mode: 'insensitive',
                },
              })),
              ...(include ? include(text) : []),
            ]
          : []),
        /* ITEMS */
        ...(items.length > 0
          ? items.map(item => {
              if (item.field == 'status') {
                return {
                  ['status']: {
                    ...(item.value === -1
                      ? { ['equals']: -1 }
                      : item.value === 1
                      ? { ['equals']: 1 }
                      : item.value === 2
                      ? { ['equals']: 2 }
                      : { ['equals']: 0 }),
                  },
                  ...(item.value == 0
                    ? {
                        ['start']: {
                          ['gte']: currentTime.toDate(),
                        },
                      }
                    : item.value == 3
                    ? {
                        ['start']: { lte: currentTime.toDate() },
                        ['end']: { gte: currentTime.toDate() },
                      }
                    : item.value == 4
                    ? {
                        ['end']: { lte: currentTime.toDate() },
                      }
                    : {}),
                };
              } else {
                return {
                  [`${item.field}`]: {
                    [`${item.operator}`]: item.value,
                  },
                };
              }
            })
          : []),
      ],
    };
  } catch (error) {
    console.error(error);
    
    return null;
  }
};

export const order = (sort: SortItem[]): any => {
  const orderBy: Record<any, SortDirection>[] = [
    {
      id: 'desc',
    },
  ];

  try {
    sort.map(sort => {
      orderBy.unshift({
        [sort.field]: sort.sort as SortDirection,
      });
    });

    return orderBy;
  } catch (error) {
    return sort;
  }
};

export const pagination = (pagination: Pagination) => {
  try {
    return {
      take: Number(pagination.pageSize),
      skip: Number(pagination.page * pagination.pageSize),
    };
  } catch (error) {
    return {
      take: 15,
      skip: 0,
    };
  }
};

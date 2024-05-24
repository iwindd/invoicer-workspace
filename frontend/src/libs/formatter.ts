import { SortDirection } from "@mui/material";
import { GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import dayjs from "./dayjs";
import { condition } from "./utils";


export const money = (val: number) => {
  try {
    if (!val) return 0;

    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(val);
  } catch (error) {
    return 0
  }
}

export const number = (val: number) => {
  try {
    if (!val) return 0;

    return val.toLocaleString()
  } catch (error) {
    return 0
  }
}

export const date = (val: Date) => {
  try {
    return new Intl.DateTimeFormat('th-TH', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(val))
  } catch (error) {
    return "-"
  }
}

export const date2 = (val: Date) => {
  try {
    return new Intl.DateTimeFormat('th-TH', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(val))
  } catch (error) {
    return "-"
  }
}

export const text = (text: string | undefined, replacer: string = "-") => {
  try {
    if (!text) return replacer
    if (text.length <= 0) return replacer
    return text
  } catch (error) {
    return replacer
  }
}

export const order = (sort: GridSortModel) => {
  const orderBy: Record<any, SortDirection>[] = [
    {
      id: "desc"
    }
  ];

  sort.map((sort) => {
    orderBy.unshift({
      [sort.field]: sort.sort as SortDirection
    })
  })

  return orderBy
}

export const filter = (filter: GridFilterModel, rows: string[], include?: (text: string) => any) => {
  const text = filter?.quickFilterValues?.[0];
  const items = filter.items;
  const currentTime = dayjs()

  if (!text && items.length <= 0) return null;

  return {
    OR: [
      /* TEXT */
      ...(
        (text ? (
          [
            ...(
              rows.map((name: string) => ({
                [`${name}`]: {
                  contains: filter?.quickFilterValues?.[0],
                  mode: 'insensitive'
                }
              }))
            ),
            ...(include ? include(text) : [])
          ]
        ) : []
        )
      ),
      /* ITEMS */
      ...(
        items.length > 0 ? (
          items.map((item) => {
            if (item.field == 'status') {
              return {
                ['status']: {
                  ...(item.value === -1 ? { ['equals']: -1 } :
                    item.value === 1 ? { ['equals']: 1 } :
                      item.value === 2 ? { ['equals']: 2 } :
                        { ['equals']: 0 })
                },
                ...(
                  item.value == 0 ? {
                    ['start']: {
                      ['gte']: currentTime.toDate()
                    }
                  } :
                    item.value == 3 ? {
                      ['start']: { lte: currentTime.toDate() },
                      ['end']: { gte: currentTime.toDate() },
                    } :
                      item.value == 4 ? {
                        ['end']: { lte: currentTime.toDate() }
                      } : {}
                )
              }
            } else {
              return {
                [`${item.field}`]: {
                  [`${item.operator}`]: item.value
                }
              }
            }
          })
        ) : []
      )
    ]
  }
}

export const invoice = ({ start, end, status }: { start: Date, end: Date, status: number }) => {
  if (status == -1) return -1;
  if (status == 1) return 1;
  if (status == 2) return 2;
  if (status == 0) {
    if (dayjs().isBetween(dayjs(start), dayjs(end))) return 3;
    if (dayjs().isAfter(dayjs(end))) return 4
  }

  return 0;
}

export const invoice_label = (status: number): string => {
  return condition(status, {
    [-1]: "ยกเลิกแล้ว",
    [0]: "รอกำหนดการ",
    [1]: "ชำระแล้ว",
    [2]: "กำลังรอตรวจสอบ",
    [3]: "กำลังดำเนินการ",
    [4]: "เลยกำหนด"
  }, "กำลังดำเนินการ")
}

export const invoice_ = (data: { start: Date, end: Date, status: number }) => {
  return invoice_label(invoice(data))
}
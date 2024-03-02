export const parsePage = (path: string) =>  +(new RegExp(/[?&]page=(\d+)/).exec(path)?.[1] ?? '1')

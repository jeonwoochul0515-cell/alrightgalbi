const krw = new Intl.NumberFormat("ko-KR");

export const formatKRW = (n: number): string => `${krw.format(n)}원`;

export const formatThousand = (n: number): string => krw.format(n);

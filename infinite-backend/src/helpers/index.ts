import randomString from "randomstring";

export const responseHandler = (payload: any, message = "success"): any => {
  return {
    success: true,
    message: message,
    data: payload || {},
  };
};

export const pagingResponse = (
  payload: any,
  total: number,
  page: number,
  limit: number,
  _url: string
): any => {
  const pageUrl = new URL(_url);

  let next;
  if (Math.ceil(total / limit) > page) {
    next = page + 1;
  }

  let previous;
  if (page > 1) {
    previous = page - 1;
  }

  // for data
  const data: any[] =
    payload === undefined || payload.length === 0 ? [] : payload;

  // for paging
  const paging: any = {};
  paging.totalItems = total;
  paging.pageSize = limit;
  paging.current = page;
  paging.count = data.length;
  paging.next = next;
  paging.previous = previous;

  // for links
  // --previous
  const links = [];
  if (previous !== undefined) {
    const prevUrl = pageUrl;
    prevUrl.searchParams.set("page", previous.toString());
    const prev = {
      href: prevUrl.href,
      rel: "prev",
      method: "GET",
    };
    links.push(prev);
  }

  // --current
  const currentUrl = pageUrl;
  currentUrl.searchParams.set("page", page.toString());
  const current = {
    href: currentUrl.href,
    rel: "current",
    method: "GET",
  };
  links.push(current);

  // --next
  if (next !== undefined) {
    const nextUrl = pageUrl;
    nextUrl.searchParams.set("page", next.toString());
    const nextPage = {
      href: nextUrl.href,
      rel: "next",
      method: "GET",
    };
    links.push(nextPage);
  }

  return {
    data,
    paging,
    links,
  };
};

export const genRandString = (
  length: number,
  charset: "alphanumeric" | "numeric" | "hex"
) => {
  return randomString.generate({ length, charset });
};

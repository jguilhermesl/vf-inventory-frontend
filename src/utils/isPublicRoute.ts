const PUBLIC_ROUTES = ['/']

export const isPublicRoute = (pathname: string) => {
  if (PUBLIC_ROUTES.includes(pathname)) {
    return true;
  } else {
    return false;
  }
}
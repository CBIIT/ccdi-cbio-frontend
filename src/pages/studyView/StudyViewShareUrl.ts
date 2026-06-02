export function buildStudyViewShareUrl(
    baseUrl: string,
    currentLocation: Pick<Location, 'pathname' | 'search'>,
    queryParams: Record<string, string>
): string {
    const shareUrl = new URL(baseUrl);
    const basePath = shareUrl.pathname.replace(/\/$/, '');
    const currentPath = currentLocation.pathname.replace(/^\//, '');
    const searchParams = new URLSearchParams(currentLocation.search);

    shareUrl.pathname = [basePath, currentPath].filter(Boolean).join('/');

    Object.keys(queryParams).forEach(key => {
        searchParams.set(key, queryParams[key]);
    });

    shareUrl.search = searchParams.toString();
    shareUrl.hash = '';

    return shareUrl.toString();
}

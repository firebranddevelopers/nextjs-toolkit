export const linkify = (link: string): string => {
    const clean = link.replace(/^\/|\/$/g, ``)
    if (!clean) {
        return `/`
    }
    return clean
}

export default linkify
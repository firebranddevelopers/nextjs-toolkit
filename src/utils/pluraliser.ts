const defaultPluraliser = (typeName: string): string => {
    let plural = typeName
    if (typeName.match(/[^aeiou]y$/i)) {
        plural = `${plural.slice(0, -1)}ie`
    }

    return `${plural}s`
}

export default defaultPluraliser

interface Coordinates {
    latitude: number
    longitude: number
}

const EARTH_RADIUS_KM = 6371

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180

export const calculateDistanceKm = (point1: Coordinates, point2: Coordinates): number => {
    const dLat = toRadians(point2.latitude - point1.latitude)
    const dLon = toRadians(point2.longitude - point1.longitude)

    const lat1 = toRadians(point1.latitude)
    const lat2 = toRadians(point2.latitude)

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return EARTH_RADIUS_KM * c
}
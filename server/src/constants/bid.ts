export const BID_STATUSES = ['pending', 'accepted', 'rejected'] as const

export type BidStatus = (typeof BID_STATUSES)[number]

export const MIN_BID_PRICE = 1
export const MAX_BID_PRICE = 100000
export const MIN_ETA_MINUTES = 1
export const MAX_ETA_MINUTES = 1440
export const MAX_BID_NOTE_LENGTH = 200
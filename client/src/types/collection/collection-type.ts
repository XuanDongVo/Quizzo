export interface CollectionResponse {
    id: string;
    name: string;
}

export interface AvailableCollectionsResponse {
    userCollections: CollectionResponse[];
    defaultCollections: CollectionResponse[];
}
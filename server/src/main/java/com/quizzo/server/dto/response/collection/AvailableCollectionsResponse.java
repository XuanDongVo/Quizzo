package com.quizzo.server.dto.response.collection;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AvailableCollectionsResponse {
    private List<CollectionResponse> userCollections;
    private List<CollectionResponse> systemCollections;
}

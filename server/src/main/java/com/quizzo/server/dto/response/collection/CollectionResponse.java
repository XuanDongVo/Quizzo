package com.quizzo.server.dto.response.collection;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class CollectionResponse {
    private String id;
    private String name;
}

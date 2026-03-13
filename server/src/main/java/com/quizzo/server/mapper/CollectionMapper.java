package com.quizzo.server.mapper;

import com.quizzo.server.dto.response.collection.CollectionResponse;
import com.quizzo.server.entity.Collection;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CollectionMapper {

    CollectionResponse toResponse (Collection collection);
}

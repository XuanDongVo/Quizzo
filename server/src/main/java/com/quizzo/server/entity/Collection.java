package com.quizzo.server.entity;

import com.quizzo.server.utils.enums.CollectionType;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "collections")
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CollectionType type;

    private boolean visibility;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    private Instant createdAt;
}


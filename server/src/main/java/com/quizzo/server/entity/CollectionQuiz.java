package com.quizzo.server.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "collection_quiz",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"collection_id", "quiz_id"})
        },
        indexes = {
                @Index(name = "idx_collection", columnList = "collection_id"),
                @Index(name = "idx_quiz", columnList = "quiz_id")
        }
)
public class CollectionQuiz {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collection_id", nullable = false)
    private Collection collection;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    private Instant addedAt;
}


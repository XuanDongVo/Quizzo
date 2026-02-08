package com.quizzo.server.entity;

import com.quizzo.server.utils.enums.QuizStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "quiz")
public class Quiz extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private QuizStatus status;

    private Boolean visibilityQuiz;
    private Boolean visibilityQuestion;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    private Instant createdAt;
    private Instant updatedAt;

    @OneToMany(mappedBy = "quiz")
    private List<Question> questions;
}

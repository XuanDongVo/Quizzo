package com.quizzo.server.entity;

import com.quizzo.server.utils.enums.QuestionType;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Enumerated(EnumType.STRING)
    private QuestionType questionType;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    private String imageUrl;
    private String videoUrl;
    private String audioUrl;

    private Integer timeLimit;
    private Integer score;
    private Integer orderIndex;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FillBlankAnswer> fillBlankAnswers;
}

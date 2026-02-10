package com.quizzo.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "fill_blank_answer")
@Getter
@Setter
public class FillBlankAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    private Integer blankIndex;

    @Column(nullable = false)
    private String answerText;
}
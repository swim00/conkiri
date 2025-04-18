package com.conkiri.domain.sharing.dto.response;

import java.time.LocalDateTime;

import com.conkiri.domain.sharing.entity.Comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDetailResponseDTO {

	private Long commentId;
	private String content;
	private String writer;
	private Long writerId;
	private String writerLevel;
	private LocalDateTime modifyTime;

	public static CommentDetailResponseDTO from(Comment comment) {
		return CommentDetailResponseDTO.builder()
			.commentId(comment.getCommentId())
			.content(comment.getContent())
			.writer(comment.getUser().getNickname())
			.writerId(comment.getUser().getUserId())
			.writerLevel(comment.getUser().getLevel())
			.modifyTime(comment.getModifyTime())
			.build();
	}
}

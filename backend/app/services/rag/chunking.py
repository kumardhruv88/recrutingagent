from typing import List


class ChunkingPipeline:
    def __init__(self, chunk_size: int = 1000, overlap: int = 200) -> None:
        self.chunk_size = chunk_size
        self.overlap = overlap

    def chunk_text(self, text: str) -> List[str]:
        if not text:
            return []

        chunks = []
        start = 0
        text_length = len(text)

        while start < text_length:
            end = start + self.chunk_size

            # If this isn't the first chunk and there's text before it, try to find a newline to split on cleanly
            if end < text_length:
                # Find last newline within the chunk to avoid cutting words
                last_newline = text.rfind("\n", start, end)
                if last_newline != -1 and last_newline > start + (self.chunk_size // 2):
                    end = last_newline + 1
                else:
                    # Find last space
                    last_space = text.rfind(" ", start, end)
                    if last_space != -1 and last_space > start + (self.chunk_size // 2):
                        end = last_space + 1

            chunk = text[start:end].strip()
            if chunk:
                chunks.append(chunk)

            start = end - self.overlap

            # If we didn't advance at all, force advance to avoid infinite loop
            if start <= start - self.overlap or end == text_length:
                break

        return chunks

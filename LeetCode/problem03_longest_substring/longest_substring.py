class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last_idx = {}
        start = 0
        max_len = 0

        for i, char in enumerate(s):
            if char in last_idx and last_idx[char] >= start:
                start = last_idx[char] + 1
            else:
                max_len = max(max_len, i - start + 1)

            last_idx[char] = i

        return max_len

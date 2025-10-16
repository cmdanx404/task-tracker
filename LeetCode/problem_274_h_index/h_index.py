from typing import List
class Solution:
    def hIndex(self, citations: List[list]) -> int:
        n = len(citations)
        count = [0] * (n + 1)
        
        for c in citations:
            if c >= n:
                count[n] += 1
            else:
                count[c] += 1
                
        total = 0
        for i in range(n, -1, -1):
            total += count[i]
            if total >= i:
                return i
            
# testcase
citations = [3, 0, 6, 1, 5]
sol = Solution()
result = sol.hIndex(citations)
print("Input: ", citations[:len(citations)], ", n = ", len(citations))
print("Output: ", result)

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = ListNode(0)  # Dummy node to simplify handling the head
        current = dummy      # Pointer to build the result list
        carry = 0            # Carry starts at 0

        # Traverse both lists until no nodes and no carry left
        while l1 or l2 or carry:
            # Get values from current nodes (or 0 if None)
            x = l1.val if l1 else 0
            y = l2.val if l2 else 0

            # Compute digit sum and new carry
            total = x + y + carry
            carry = total // 10
            digit = total % 10

            # Add new digit node to result
            current.next = ListNode(digit)
            current = current.next

            # Move to next nodes
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None

        return dummy.next  # Return the real head of the result list

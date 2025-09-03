# Performance Optimization (is about doing less work, at the right time)

To optimize the performance of your React application--

```mermaid
flowchart LR
    A[State/Props Changes<br>(Something new happened)] --> B[Rerender Phase<br>(React rethinks UI)]
    B --> C[Reconciliation Phase<br>(React figures out what actually changed)]
    C --> D[Commit Phase<br>(React applies changes)]
```

**Flow Explanation:**
- **State/Props Changes:** Something new happens in your app.
- **Rerender Phase:** React rethinks what the UI should look like.
- **Reconciliation Phase:** React checks what actually changed.
- **Commit Phase:** React applies those changes to the DOM.



 ### Techniques to Improve Performance

  - React.memo
  - useMemo
  - useCallback


## useMemo
 - optimizing using useMemo - memoize the input value

 - useMemo only recalculates when (input) dependencies change.
 - Runs during render phase (synchronous).
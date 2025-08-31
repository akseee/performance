# Performace

### Performance Optimization with React.memo and useMemo

### Profiling Results

I compared the application performance before and after optimization by running the same set of actions:

- Sorting
- Searching
- Filtering by year

All of these interactions showed measurable improvements in render duration.
While the gains were only a few milliseconds, the profiling clearly indicates reduced rendering time — confirming that memoization helps, especially as data scales.

The optimizations includes:

- using useMemo to memoize the filtered, searched, and sorted list of countries and selected columns
- using useCallback to memoize event handler functions for filtering, searching, sorting, and column selection.
- using React.memo to wrap country component to prevent unnecessary re-renders.
- using proper key props for lists and tables to avoid reconciliation issues.

# Screenshots

1. Search responds faster with the same requests. The component uses the cached result and does not perform unnecessary calculations.

without optimization
![alt text](/public/{9DF68C6C-4736-4DA5-8284-E18EF6CE0848}.png)
vs with optimization
![alt text]({E98DFE96-AC0A-4B85-A4CF-46846B103776}.png)

2. The same picture is observed with sorting. When selecting sorting several times in a row, useMemo prevents repeated heavy rerenders for country cards compoennnt, as we can see wrapping its compoennt in react.memo actually did good job

without optimization
![alt text](/public/{01D62E1C-6530-4CE1-A561-C66528E6288D}.png)
vs with optimization
![alt text]({095C8469-8166-4769-8FD0-4AC9FE628135}.png)

3.  When I selected the same year several times in a row. Change is not massive. But the calculation for changed year data will have to happen either way to keep it dynamic

without optimization
![alt text](/public/{FAEF20CF-215A-4691-9F54-5E212C9CC1EF}.png)
vs with optimization
![alt text](/public/{74FC0396-F8D3-4267-A572-58A49BD4C1BD}.png)

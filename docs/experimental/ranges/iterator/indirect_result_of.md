# std::experimental::ranges::indirect_result_of

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class > struct indirect_result_of {};
```

  
template< class F, class... Is >  
requires Invocable<F, ranges::reference_t&lt;Is&gt;...>  
struct indirect_result_of<F(Is...)>  
: [std::result_of](<#/doc/types/result_of>)<F(ranges::reference_t&lt;Is&gt;&&...)> {}; |  |  (ranges TS)  

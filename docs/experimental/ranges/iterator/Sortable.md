# std::experimental::ranges::Sortable

template< class I, class R = [ranges::less](<#/doc/experimental/ranges/functional/less>)<>, class P = [ranges::identity](<#/doc/experimental/ranges/functional/identity>) >  
concept bool Sortable =  
Permutable&lt;I&gt; &&  
IndirectStrictWeakOrder<R, ranges::[projected](<#/doc/experimental/ranges/iterator/projected>)<I, P>>; |  |  (ranges TS)  

  
O `concept` `Sortable` especifica os requisitos comuns de algoritmos que permutam sequências em sequências ordenadas (por exemplo, [`ranges::sort`](<#/doc/experimental/ranges/algorithm/sort>)). 
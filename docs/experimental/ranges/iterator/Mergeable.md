# std::experimental::ranges::Mergeable

template< class I1, class I2, class Out, class R = [ranges::less](<#/doc/experimental/ranges/functional/less>)<>,  
class P1 = [ranges::identity](<#/doc/experimental/ranges/functional/identity>), class P2 = [ranges::identity](<#/doc/experimental/ranges/functional/identity>) >  
concept bool Mergeable =  
InputIterator&lt;I1&gt; &&  
InputIterator&lt;I2&gt; &&  
WeaklyIncrementable&lt;Out&gt; &&  
IndirectlyCopyable<I1, Out> &&  
IndirectlyCopyable<I2, Out> &&  
IndirectStrictWeakOrder<R, ranges::[projected](<#/doc/experimental/ranges/iterator/projected>)<I1, P1>, ranges::[projected](<#/doc/experimental/ranges/iterator/projected>)<I2, P2>>; |  |  (ranges TS)  

  
O `Mergeable` concept especifica os requisitos comuns de algoritmos que mesclam sequências ordenadas em uma sequência de saída copiando os elementos (por exemplo, [`ranges::merge`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/merge&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/merge \(page does not exist\)")). 
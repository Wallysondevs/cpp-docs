# std::experimental::ranges::Permutable

template< class I >  
concept bool Permutable =  
ForwardIterator&lt;I&gt; &&  
IndirectlyMovableStorable<I, I> &&  
IndirectlySwappable<I, I>; |  |  (ranges TS)  

  
O `Permutable` concept especifica os requisitos comuns de algoritmos que reordenam elementos no local movendo-os ou trocando-os (por exemplo, [`ranges::rotate`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/ranges/algorithm/rotate&action=edit&redlink=1> "cpp/experimental/ranges/algorithm/rotate \(page does not exist\)")). 
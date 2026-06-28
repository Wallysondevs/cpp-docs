# std::experimental::ranges::tagged&lt;Base,Tags...&gt;::swap

constexpr void swap( tagged& rhs ) noexcept(/* see below */)  
requires Swappable&lt;Base&gt;;

  
Troca o conteúdo de *this e rhs, como se por [ranges::swap](<#/doc/experimental/ranges/utility/swap>)(static_cast<Base&>(*this), static_cast<Base&>(rhs));. 

### Exceções

[`noexcept`](<#/doc/language/noexcept_spec>) especificação: 

noexcept(noexcept([ranges::swap](<#/doc/experimental/ranges/utility/swap>)([std::declval](<#/doc/utility/declval>)<Base&>(), [std::declval](<#/doc/utility/declval>)<Base&>())))

### Ver também

[ ranges::swap(ranges::tagged)](<#/doc/experimental/ranges/utility/tagged/swap2>) | especializa `swap` para objetos `tagged`   
(função)  
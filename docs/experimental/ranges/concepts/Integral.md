# std::experimental::ranges::Integral

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool Integral = std::is_integral<T>::value;
```

O concept Integral&lt;T&gt; é satisfeito se e somente se `T` for um tipo integral.

Não é necessário que haja qualquer relação de subsunção entre Integral&lt;T&gt; e [std::is_integral](<#/doc/types/is_integral>)&lt;T&gt;::value.

### Veja também

[ is_integral](<#/doc/types/is_integral>)(C++11) | verifica se um tipo é um tipo integral
(class template)
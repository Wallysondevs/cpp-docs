# std::experimental::ranges::UnsignedIntegral

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool UnsignedIntegral = Integral<T> && !SignedIntegral<T>;
```

O concept `UnsignedIntegral<T>` é satisfeito se e somente se `T` é um tipo integral e [std::is_signed](<#/doc/types/is_signed>)&lt;T&gt;::value é falso.

### Notas

`UnsignedIntegral<T>` pode ser satisfeito por um tipo que não é um [tipo inteiro sem sinal](<#/doc/language/type-id>), por exemplo, bool.

### Veja também

[ is_integral](<#/doc/types/is_integral>)(desde C++11) | verifica se um tipo é um tipo integral
(modelo de classe)
[ is_signed](<#/doc/types/is_signed>)(desde C++11) | verifica se um tipo é um tipo aritmético com sinal
(modelo de classe)
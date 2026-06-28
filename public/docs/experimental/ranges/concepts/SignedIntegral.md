# std::experimental::ranges::SignedIntegral

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool SignedIntegral = Integral<T> && std::is_signed<T>::value;
```

O concept `SignedIntegral<T>` é satisfeito se e somente se `T` for um tipo integral e [std::is_signed](<#/doc/types/is_signed>)&lt;T&gt;::value for verdadeiro.

Não é necessário que haja qualquer relação de subsunção entre `SignedIntegral<T>` e [std::is_signed](<#/doc/types/is_signed>)&lt;T&gt;::value.

### Observações

`SignedIntegral<T>` pode ser satisfeito por um tipo que não é um [tipo inteiro com sinal](<#/doc/language/type-id>), por exemplo, char (em um sistema onde char é assinado).

### Veja também

[ is_integral](<#/doc/types/is_integral>)(desde C++11) | verifica se um tipo é um tipo integral
(modelo de classe)
[ is_signed](<#/doc/types/is_signed>)(desde C++11) | verifica se um tipo é um tipo aritmético com sinal
(modelo de classe)
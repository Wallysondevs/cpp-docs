# std::experimental::ranges::Constructible

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T, class... Args >
concept bool Constructible =
Destructible<T> && std::is_constructible<T, Args...>::value;
```

  
O `concept` `Constructible` especifica que uma variável do tipo `T` pode ser inicializada com o conjunto de tipos de argumentos `Args...` fornecido.

Não é necessário que haja qualquer relação de subsunção entre `Constructible<T, Args...>` e [std::is_constructible](<#/doc/types/is_constructible>)<T, Args...>::value.

### Veja também

[ is_constructibleis_trivially_constructibleis_nothrow_constructible](<#/doc/types/is_constructible>)(C++11)(C++11)(C++11) |  verifica se um tipo possui um construtor para argumentos específicos   
(modelo de classe)  
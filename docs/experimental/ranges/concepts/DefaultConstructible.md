# std::experimental::ranges::DefaultConstructible

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool DefaultConstructible = Constructible<T>;
```

O concept `DefaultConstructible` fornece um atalho para o caso comum quando a questão é se um tipo pode ser construído sem argumentos.

### Veja também

[ Constructible](<#/doc/experimental/ranges/concepts/Constructible>) | especifica que uma variável do tipo pode ser construída a partir de ou vinculada a um conjunto de tipos de argumento
(concept)
[ is_default_constructibleis_trivially_default_constructibleis_nothrow_default_constructible](<#/doc/types/is_default_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor padrão
(class template)
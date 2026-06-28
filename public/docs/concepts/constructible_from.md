# std::constructible_from

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T, class... Args >
concept constructible_from =
std::destructible<T> && std::is_constructible_v<T, Args...>;
```

O concept `constructible_from` especifica que uma variável do tipo `T` pode ser inicializada com o conjunto dado de tipos de argumento `Args...`.

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

*   18.4.11 Concept `constructible_from` [concept.constructible]

*   Padrão C++20 (ISO/IEC 14882:2020):

*   18.4.11 Concept `constructible_from` [concept.constructible]

### Veja também

[ is_constructibleis_trivially_constructibleis_nothrow_constructible](<#/doc/types/is_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor para argumentos específicos
(modelo de classe)
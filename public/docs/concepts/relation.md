# std::relation

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class R, class T, class U >
concept relation =
std::predicate<R, T, T> && std::predicate<R, U, U> &&
std::predicate<R, T, U> && std::predicate<R, U, T>;
```

O conceito `relation<R, T, U>` especifica que `R` define uma relação binária sobre o conjunto de expressões cujo tipo e categoria de valor são aqueles codificados por `T` ou `U`.

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 18.7.5 Conceito `relation` [concept.relation]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 18.7.5 Conceito `relation` [concept.relation]

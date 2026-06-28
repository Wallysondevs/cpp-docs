# std::predicate

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class F, class... Args >
concept predicate =
std::regular_invocable<F, Args...> &&
boolean-testable<std::invoke_result_t<F, Args...>>;
```

O concept std::predicate<F, Args...> especifica que `F` é um predicate que aceita argumentos cujos tipos e categorias de valor são codificados por `Args...`, ou seja, ele pode ser invocado com esses argumentos para produzir um resultado [`_boolean-testable_`](<#/doc/concepts/boolean-testable>).

Note que [`regular_invocable`](<#/doc/concepts/invocable>) exige que a invocação não modifique nem o objeto invocável nem os argumentos e seja [equality-preserving](<#/doc/concepts>).

### Preservação de Igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas como sendo [equality-preserving](<#/doc/concepts>) (exceto onde indicado o contrário).

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

  * 18.7.4 Concept `predicate` [concept.predicate]

  * Padrão C++20 (ISO/IEC 14882:2020):

  * 18.7.4 Concept `predicate` [concept.predicate]

# std::invocable, std::regular_invocable

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class F, class... Args >
concept invocable =
requires(F&& f, Args&&... args) {
std::invoke(std::forward<F>(f), std::forward<Args>(args)...);
/* não é exigido que preserve a igualdade */
};
template< class F, class... Args >
concept regular_invocable = std::invocable<F, Args...>;
```

O concept `invocable` especifica que um tipo invocável `F` pode ser chamado com um conjunto de argumentos `Args...` usando o template de função [std::invoke](<#/doc/utility/functional/invoke>).

O concept `regular_invocable` adiciona ao concept `invocable` exigindo que a expressão `invoke` seja [equality-preserving](<#/doc/concepts>) e não modifique nem o objeto de função nem os argumentos.

### Preservação de igualdade (Equality preservation)

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas como sendo [equality-preserving](<#/doc/concepts>) (exceto onde declarado o contrário).

### Notas

A distinção entre `invocable` e `regular_invocable` é puramente semântica.

Um gerador de números aleatórios pode satisfazer `invocable` mas não pode satisfazer `regular_invocable` (excluindo os [cômicos](<#/doc/concepts/invocable>)).

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 18.7.2 Concept `invocable` [concept.invocable]

    

  * 18.7.3 Concept `regular_invocable` [concept.regularinvocable]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 18.7.2 Concept `invocable` [concept.invocable]

    

  * 18.7.3 Concept `regular_invocable` [concept.regularinvocable]

### Veja também

[ is_invocableis_invocable_ris_nothrow_invocableis_nothrow_invocable_r](<#/doc/types/is_invocable>)(C++17) | verifica se um tipo pode ser invocado (como se por [std::invoke](<#/doc/utility/functional/invoke>)) com os tipos de argumento fornecidos
(template de classe)

### Links externos

Um [exemplo de piada](<https://xkcd.com/221/>) de um gerador de números aleatórios que satisfaz tanto `invocable` quanto `regular_invocable`.
---
# std::experimental::ranges::Same

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T, class U >
concept bool Same = std::is_same<T, U>::value; // see below
```

O concept `Same<T, U>` é satisfeito se e somente se `T` e `U` denotam o mesmo tipo.

Apesar de ser especificado usando-o, não é necessário que haja qualquer relação de subsunção entre Same<T, U> e [std::is_same](<#/doc/types/is_same>)<T, U>::value.

Para fins de verificação de restrições, Same<T, U> implica Same<U, T>.

### Notas

O requisito adicional na verificação de restrições diferencia `Same` de [std::is_same](<#/doc/types/is_same>).

### Veja também

[ is_same](<#/doc/types/is_same>)(C++11) | verifica se dois tipos são os mesmos
(modelo de classe)
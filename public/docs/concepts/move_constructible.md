# std::move_constructible

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept move_constructible = std::constructible_from<T, T> && std::convertible_to<T, T>;
```

O concept `move_constructible` é satisfeito se `T` é um tipo de referência, ou se é um tipo de objeto onde um objeto desse tipo pode ser construído a partir de um rvalue desse tipo em contextos de inicialização direta e de cópia, com a semântica usual.

### Requisitos semânticos

Se `T` é um tipo de objeto, então `move_constructible<T>` é modelado apenas se, dado

  * `rv`, um rvalue do tipo `T`, e
  * `u2`, um objeto distinto do tipo `T` igual a `rv`,

o seguinte é verdadeiro:

  * Após a definição T u = rv;, `u` é igual a `u2`;
  * `T(rv)` é igual a `u2`; e
  * Se `T` não é qualificado como const, então o estado resultante de `rv` (após a definição/expressão ser avaliada em qualquer um dos itens acima) é válido, mas não especificado; caso contrário, ele permanece inalterado.

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 18.4.13 Concept `move_constructible` [concept.moveconstructible]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 18.4.13 Concept `move_constructible` [concept.moveconstructible]

### Veja também

[ is_move_constructibleis_trivially_move_constructibleis_nothrow_move_constructible](<#/doc/types/is_move_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo pode ser construído a partir de uma referência rvalue
(modelo de classe)
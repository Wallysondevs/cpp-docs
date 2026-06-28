# std::experimental::ranges::MoveConstructible

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool MoveConstructible =
Constructible<T, T> && ConvertibleTo<T, T>;
```

  
O concept `MoveConstructible` é satisfeito se `T` é um tipo de referência, ou se é um tipo de objeto onde um objeto desse tipo pode ser construído a partir de um rvalue desse tipo em contextos de inicialização direta e por cópia, com a semântica usual.

Mais precisamente, se `T` é um tipo de objeto, então `MoveConstructible<T>` é satisfeito apenas se, dado

  * `rv`, um rvalue do tipo `T`, e
  * `u2`, um objeto distinto do tipo `T` igual a `rv`,

o seguinte é verdadeiro:

  * Após a definição T u = rv;, `u` é igual a `u2`;
  * `T{rv}` é igual a `u2`; e
  * Se `T` não é qualificado como `const`, então o estado resultante de `rv` (após a definição/expressão ser avaliada em qualquer um dos itens acima) é válido, mas não especificado; caso contrário, permanece inalterado.

### Veja também

[ is_move_constructibleis_trivially_move_constructibleis_nothrow_move_constructible](<#/doc/types/is_move_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo pode ser construído a partir de uma referência rvalue   
(modelo de classe)  
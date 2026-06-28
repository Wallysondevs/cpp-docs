# std::is_swappable_with, std::is_swappable, std::is_nothrow_swappable_with, std::is_nothrow_swappable

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T, class U >
struct is_swappable_with;
template< class T >
struct is_swappable;
template< class T, class U >
struct is_nothrow_swappable_with;
template< class T >
struct is_nothrow_swappable;
```

1) Se as expressões swap([std::declval](<#/doc/utility/declval>)&lt;T&gt;(), [std::declval](<#/doc/utility/declval>)&lt;U&gt;()) e swap([std::declval](<#/doc/utility/declval>)&lt;U&gt;(), [std::declval](<#/doc/utility/declval>)&lt;T&gt;()) forem ambas bem-formadas em contexto não avaliado após usar [std::swap](<#/doc/algorithm/swap>); (veja [Swappable](<#/doc/named_req/Swappable>)), fornece a constante membro `value` igual a true. Caso contrário, `value` é false.

[Verificações de acesso](<#/doc/language/access>) são realizadas como se fossem de um contexto não relacionado a nenhum dos tipos.

3) O mesmo que (1), mas as avaliações de ambas as expressões de (1) são conhecidas por não lançarem exceções.

Type trait | O valor da constante membro `value`
---|---
`T` é um [tipo referenciável](<#/doc/meta>) | `T` não é um tipo referenciável
(2) | `std::is_swappable_with<T&, T&>::value` | false
(4) | `std::is_nothrow_swappable_with<T&, T&>::value`

Se `T` ou `U` não for um tipo completo, (possivelmente cv-qualificado) void, ou um array de limite desconhecido, o comportamento é indefinido.

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação pudesse produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Helper variable templates

```cpp
template< class T, class U >
inline constexpr bool is_swappable_with_v = is_swappable_with<T, U>::value;  // (desde C++17)
template< class T >
inline constexpr bool is_swappable_v = is_swappable<T>::value;  // (desde C++17)
template< class T, class U >
inline constexpr bool is_nothrow_swappable_with_v =
is_nothrow_swappable_with<T, U>::value;  // (desde C++17)
template< class T >
inline constexpr bool is_nothrow_swappable_v =
is_nothrow_swappable<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for swappable com `U`, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

Este trait não verifica nada fora do contexto imediato das expressões de swap: se o uso de `T` ou `U` acionaria especializações de template, geração de funções membro especiais definidas implicitamente etc., e essas tiverem erros, o swap real pode não compilar mesmo que `std::is_swappable_with<T, U>::value` compile e avalie para true.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(template de função)
[ is_move_assignableis_trivially_move_assignableis_nothrow_move_assignable](<#/doc/types/is_move_assignable>)(C++11)(C++11)(C++11) | verifica se um tipo possui um operador de atribuição por movimento
(template de classe)
[ swappableswappable_with](<#/doc/concepts/swappable>)(C++20) | especifica que um tipo pode ser trocado ou que dois tipos podem ser trocados entre si
(concept)
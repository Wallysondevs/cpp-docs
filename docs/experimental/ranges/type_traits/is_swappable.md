# std::experimental::ranges::is_swappable_with, std::experimental::ranges::is_swappable, std::experimental::ranges::is_nothrow_swappable_with, std::experimental::ranges::is_nothrow_swappable

Definido no cabeçalho `[<experimental/ranges/type_traits>](<#/doc/header/experimental/ranges/type_traits>)`

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

  
1) Se as expressões [ranges::swap](<#/doc/experimental/ranges/utility/swap>)([std::declval](<#/doc/utility/declval>)&lt;T&gt;(), [std::declval](<#/doc/utility/declval>)&lt;U&gt;()) e [ranges::swap](<#/doc/experimental/ranges/utility/swap>)([std::declval](<#/doc/utility/declval>)&lt;U&gt;(), [std::declval](<#/doc/utility/declval>)&lt;T&gt;()) forem ambas bem-formadas quando tratadas como um operando não avaliado, fornece a constante membro `value` igual a true. Caso contrário, `value` é false. Verificações de acesso são realizadas como se de um contexto não relacionado a nenhum dos tipos.

2) Se `T` não for um tipo referenciável (ou seja, possivelmente void cv-qualificado ou um tipo de função com uma _cv-qualifier-seq_ ou um _ref-qualifier_), fornece uma constante membro `value` igual a false. Caso contrário, fornece uma constante membro `value` igual a ranges::is_swappable_with<T&, T&>::value.

3) O mesmo que (1), mas as avaliações de ambas as expressões de (1) são conhecidas por não lançarem exceções.

4) O mesmo que (2), mas usa is_nothrow_swappable_with.

`T` e `U` devem ser cada um um tipo completo, void (possivelmente cv-qualificado), ou um array de limite desconhecido. Caso contrário, o comportamento é indefinido.

### Modelos de variáveis auxiliares

template< class T, class U >  
constexpr bool is_swappable_with_v = is_swappable_with<T, U>::value; |  (1)  |  (ranges TS)  
template< class T >  
constexpr bool is_swappable_v = is_swappable&lt;T&gt;::value; |  (2)  |  (ranges TS)  
template< class T, class U >  
constexpr bool is_nothrow_swappable_with_v = is_nothrow_swappable_with<T, U>::value; |  (3)  |  (ranges TS)  
template< class T >  
constexpr bool is_nothrow_swappable_v = is_nothrow_swappable&lt;T&gt;::value; |  (4)  |  (ranges TS)  

  
## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] |  true se `T` for swappável com `U`, false caso contrário   
(constante membro estática pública)  
  
### Funções membro

operator bool |  converte o objeto para bool, retorna value   
(função membro pública)  
operator()(C++14) |  retorna value   
(função membro pública)  
  
### Tipos membro

Tipo  |  Definição   
---|---
`value_type` |  bool  
`type` |  [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>  
  
### Notas

Este trait não verifica nada fora do contexto imediato das expressões de troca: se o uso de `T` ou `U` acionaria especializações de template, geração de funções membro especiais implicitamente definidas etc., e estas tiverem erros, a troca real pode não compilar mesmo que `ranges::is_swappable_with<T,U>::value` compile e avalie para true.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ SwappableSwappableWith](<#/doc/experimental/ranges/concepts/Swappable>) |  especifica que um tipo pode ser trocado ou que dois tipos podem ser trocados entre si   
(conceito)  
[ is_swappable_withis_swappableis_nothrow_swappable_withis_nothrow_swappable](<#/doc/types/is_swappable>)(C++17)(C++17)(C++17)(C++17) |  verifica se objetos de um tipo podem ser trocados com objetos do mesmo tipo ou de tipos diferentes   
(modelo de classe)
# std::ranges::not_equal_to

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
struct not_equal_to;
```

Objeto de função para realizar comparações. Deduz os tipos de parâmetro do operador de chamada de função a partir dos argumentos (mas não o tipo de retorno).

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

operator() | verifica se os argumentos são _não iguais_
(função membro pública)

## std::ranges::not_equal_to::operator()

template< class T, class U >
constexpr bool operator()( T&& t, U&& u ) const;

Equivalente a `return ![ranges::equal_to](<#/>){}([std::forward](<#/doc/utility/forward>)<T>(t), [std::forward](<#/doc/utility/forward>)<U>(u));`.

Esta sobrecarga participa da resolução de sobrecarga somente se [std::equality_comparable_with](<#/doc/concepts/equality_comparable>)<T, U> for satisfeita.

### Notas

Ao contrário de [std::not_equal_to](<#/doc/utility/functional/not_equal_to>), `std::ranges::not_equal_to` exige que `==` e `!=` sejam válidos (através da restrição [`equality_comparable_with`](<#/doc/concepts/equality_comparable>)), e é inteiramente definida em termos de `std::ranges::equal_to`.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3530](<https://cplusplus.github.io/LWG/issue3530>) | C++20 | verificações sintáticas foram relaxadas ao comparar ponteiros | apenas requisitos semânticos são relaxados

### Veja também

[ not_equal_to](<#/doc/utility/functional/not_equal_to>) | objeto de função que implementa x != y
(class template)
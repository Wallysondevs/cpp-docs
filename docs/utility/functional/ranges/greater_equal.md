# std::ranges::greater_equal

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
struct greater_equal;
```

Objeto de função para realizar comparações. Deduz os tipos dos parâmetros do operador de chamada de função a partir dos argumentos (mas não o tipo de retorno).

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

operator() | verifica se o primeiro argumento é _maior_ ou _igual_ ao segundo
(função membro pública)

## std::ranges::greater_equal::operator()

template< class T, class U >
constexpr bool operator()( T&& t, U&& u ) const;

Equivalente a `return ![ranges::less](<#/>){}([std::forward](<#/doc/utility/forward>)<T>(t), [std::forward](<#/doc/utility/forward>)<U>(u));`.

Esta sobrecarga participa da resolução de sobrecarga somente se `[std::totally_ordered_with](<#/doc/concepts/totally_ordered>)<T, U>` for satisfeita.

### Notas

Ao contrário de `[std::greater_equal](<#/doc/utility/functional/greater_equal>)`, `std::ranges::greater_equal` requer que todos os seis operadores de comparação `<`, `<=`, `>`, `>=`, `==` e `!=` sejam válidos (através da restrição [`totally_ordered_with`](<#/doc/concepts/totally_ordered>)) e é inteiramente definida em termos de `std::ranges::less`.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3530](<https://cplusplus.github.io/LWG/issue3530>) | C++20 | verificações sintáticas foram relaxadas ao comparar ponteiros | apenas requisitos semânticos são relaxados

### Ver também

[ greater_equal](<#/doc/utility/functional/greater_equal>) | objeto de função que implementa x >= y
(modelo de classe)
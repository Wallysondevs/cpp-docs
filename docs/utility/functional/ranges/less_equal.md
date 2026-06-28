# std::ranges::less_equal

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
struct less_equal;
```

Objeto de função para realizar comparações. Deduz os tipos de parâmetro do operador de chamada de função a partir dos argumentos (mas não o tipo de retorno).

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

operator() | verifica se o primeiro argumento é _menor_ ou _igual_ ao segundo
(função membro pública)

## std::ranges::less_equal::operator()

template< class T, class U >
constexpr bool operator()( T&& t, U&& u ) const;

Equivalente a `return ![ranges::less](<#/>){}([std::forward](<#/doc/utility/forward>)<U>(u), [std::forward](<#/doc/utility/forward>)<T>(t));`.

Esta sobrecarga participa da resolução de sobrecarga somente se [std::totally_ordered_with](<#/doc/concepts/totally_ordered>)<T, U> for satisfeita.

### Notas

Ao contrário de [std::less_equal](<#/doc/utility/functional/less_equal>), `std::ranges::less_equal` requer que todos os seis operadores de comparação `<`, `<=`, `>`, `>=`, `==` e `!=` sejam válidos (através da restrição [`totally_ordered_with`](<#/doc/concepts/totally_ordered>)) e é inteiramente definida em termos de std::ranges::less.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3530](<https://cplusplus.github.io/LWG/issue3530>) | C++20 | verificações sintáticas foram relaxadas ao comparar ponteiros | apenas os requisitos semânticos são relaxados

### Ver também

[ less_equal](<#/doc/utility/functional/less_equal>) | objeto de função que implementa x <= y
(modelo de classe)
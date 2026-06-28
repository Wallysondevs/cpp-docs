# std::ranges::greater

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
struct greater;
```

Objeto de função para realizar comparações. Deduz os tipos de parâmetro do operador de chamada de função a partir dos argumentos (mas não o tipo de retorno).

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

operator() | verifica se o primeiro argumento é _maior_ que o segundo
(função membro pública)

## std::ranges::greater::operator()

template< class T, class U >
constexpr bool operator()( T&& t, U&& u ) const;

Equivalente a `return [ranges::less](<#/>){}([std::forward](<#/doc/utility/forward>)<U>(u), [std::forward](<#/doc/utility/forward>)<T>(t));`.

Esta sobrecarga participa da resolução de sobrecarga somente se [std::totally_ordered_with](<#/doc/concepts/totally_ordered>)<T, U> for satisfeita.

### Notas

Ao contrário de [std::greater](<#/doc/utility/functional/greater>), `std::ranges::greater` exige que todos os seis operadores de comparação `<`, `<=`, `>`, `>=`, `==` e `!=` sejam válidos (através da restrição [`totally_ordered_with`](<#/doc/concepts/totally_ordered>)) e é inteiramente definida em termos de std::ranges::less.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3530](<https://cplusplus.github.io/LWG/issue3530>) | C++20 | verificações sintáticas foram relaxadas ao comparar ponteiros | apenas requisitos semânticos são relaxados

### Veja também

[ greater](<#/doc/utility/functional/greater>) | objeto de função que implementa x > y
(modelo de classe)
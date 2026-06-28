# std::ranges::less

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
struct less;
```

Objeto de função para realizar comparações. Deduz os tipos de parâmetro do operador de chamada de função a partir dos argumentos (mas não o tipo de retorno).

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

operator() | verifica se o primeiro argumento é _menor_ que o segundo
(função membro pública)

## std::ranges::less::operator()

template< class T, class U >
constexpr bool operator()( T&& t, U&& u ) const;

Dada a expressão [std::forward](<#/doc/utility/forward>)&lt;T&gt;(t) < [std::forward](<#/doc/utility/forward>)&lt;U&gt;(u) como expr:

*   Se expr resultar em uma chamada ao operador< [embutido](<#/doc/language/operator_comparison>) que compara ponteiros, dado o [tipo de ponteiro composto](<#/doc/language/pointer>) de t e u como `P`:

    *   Se o t convertido preceder o u convertido (ambos são do tipo `P`) na [ordem total estrita sobre ponteiros definida pela implementação](<#/doc/language/operator_comparison>), retorna true, caso contrário retorna false.
    *   Se a sequência de conversão de `T` para `P` ou a sequência de conversão de `U` para `P` não for [equality-preserving](<#/doc/concepts>), o comportamento é indefinido.

*   Caso contrário:

    *   Retorna o resultado de expr.
    *   Se [std::totally_ordered_with](<#/doc/concepts/totally_ordered>)<T, U> não for modelado, o comportamento é indefinido.

Esta sobrecarga participa da resolução de sobrecarga somente se [std::totally_ordered_with](<#/doc/concepts/totally_ordered>)<T, U> for satisfeito.

Se existir uma expressão expr1 do tipo `T` e uma expressão expr2 do tipo `U`, tal que os resultados da comparação de expr1 e expr2 violem a [ordem total estrita](<https://en.wikipedia.org/wiki/Total_order#Strict_and_non-strict_total_orders> "enwiki:Total order") (as regras são definidas abaixo), o comportamento é indefinido.

Os resultados da comparação de expr1 e expr2 seguem a ordem total estrita somente se **exatamente uma** das seguintes expressões for verdadeira:

*   std::[ranges::less](<#/>){}(expr1, expr2)
*   std::[ranges::less](<#/>){}(expr2, expr1)
*   std::[ranges::equal_to](<#/>){}(expr1, expr2)

### Notas

Ao contrário de [std::less](<#/doc/utility/functional/less>), `std::ranges::less` exige que todos os seis operadores de comparação `<`, `<=`, `>`, `>=`, `==` e `!=` sejam válidos (através da restrição [`totally_ordered_with`](<#/doc/concepts/totally_ordered>)).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3530](<https://cplusplus.github.io/LWG/issue3530>) | C++20 | verificações sintáticas foram relaxadas ao comparar ponteiros | apenas os requisitos semânticos são relaxados

### Veja também

[ less](<#/doc/utility/functional/less>) | objeto de função que implementa x < y
(modelo de classe)
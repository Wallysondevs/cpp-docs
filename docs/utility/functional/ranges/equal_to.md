# std::ranges::equal_to

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
struct equal_to;
```

Objeto de função para realizar comparações. Os tipos de parâmetro do operador de chamada de função (mas não o tipo de retorno) são deduzidos dos argumentos.

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

operator() | verifica se os argumentos são _iguais_
(função membro pública)

## std::ranges::equal_to::operator()

template< class T, class U >
constexpr bool operator()( T&& t, U&& u ) const;

Dada a expressão [std::forward](<#/doc/utility/forward>)&lt;T&gt;(t) == [std::forward](<#/doc/utility/forward>)&lt;U&gt;(u) como expr:

*   Se expr resultar em uma chamada ao operador== [embutido](<#/doc/language/operator_comparison>) que compara ponteiros, dado o [tipo de ponteiro composto](<#/doc/language/pointer>) de t e u como `P`:

    *   Para os dois ponteiros convertidos (do tipo `P`), se um ponteiro precede o outro na [ordem total estrita sobre ponteiros definida pela implementação](<#/doc/language/operator_comparison>), retorna false, caso contrário retorna true.
    *   Se a sequência de conversão de `T` para `P` ou a sequência de conversão de `U` para `P` não for [preservadora de igualdade](<#/doc/concepts>), o comportamento é indefinido.

*   Caso contrário:

    *   Retorna o resultado de expr.
    *   Se [std::equality_comparable_with](<#/doc/concepts/equality_comparable>)<T, U> não for modelado, o comportamento é indefinido.

Esta sobrecarga participa da resolução de sobrecarga somente se [std::equality_comparable_with](<#/doc/concepts/equality_comparable>)<T, U> for satisfeita.

### Observações

Comparado a [std::equal_to](<#/doc/utility/functional/equal_to>), `std::ranges::equal_to` adicionalmente exige que `!=` seja válido, e que ambos os tipos de argumento sejam (homogeneamente) comparáveis consigo mesmos (através da restrição [`equality_comparable_with`](<#/doc/concepts/equality_comparable>)).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3530](<https://cplusplus.github.io/LWG/issue3530>) | C++20 | verificações sintáticas foram relaxadas ao comparar ponteiros | apenas requisitos semânticos são relaxados

### Veja também

[ equal_to](<#/doc/utility/functional/equal_to>) | objeto de função que implementa x == y
(modelo de classe)
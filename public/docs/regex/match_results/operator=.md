# std::match_results&lt;BidirIt,Alloc&gt;::operator=

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
match_results& operator=( const match_results& other );
match_results& operator=( match_results&& other ) noexcept;
```

Atribui o conteúdo.

1) Operador de atribuição por cópia. Atribui o conteúdo de `other`.

2) Operador de atribuição por movimento. Atribui o conteúdo de `other` usando move semantics. `other` fica em um estado válido, mas não especificado, após a operação.

Dado o valor de `other` antes da atribuição como `m` e qualquer inteiro em `[`​0​`, `m.size()`)` como `n`, quando a atribuição termina, as seguintes funções membro devem retornar os valores especificados:

Função membro | Valor
---|---
[`ready()`](<#/doc/regex/match_results/ready>) | m.ready()
[`size()`](<#/doc/regex/match_results/size>) | m.size()
[`str(n)`](<#/doc/regex/match_results/str>) | m.str(n)
[`prefix()`](<#/doc/regex/match_results/prefix>) | m.prefix()
[`suffix()`](<#/doc/regex/match_results/suffix>) | m.suffix()
[`operator[](n)`](<#/doc/regex/match_results/operator_at>) | m[n]
[`length(n)`](<#/doc/regex/match_results/length>) | m.length(n)
[`position(n)`](<#/doc/regex/match_results/position>) | m.position(n)

### Parâmetros

- **other** — outro objeto `match_results`

### Valor de retorno

`*this`

### Exceções

1) Pode lançar exceções definidas pela implementação.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2191](<https://cplusplus.github.io/LWG/issue2191>) | C++11 | `n` poderia ser negativo nas pós-condições | só pode ser não-negativo
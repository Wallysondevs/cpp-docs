# std::match_results&lt;BidirIt,Alloc&gt;::match_results

```cpp
match_results() : match_results(Allocator()) {}  // (1)
explicit match_results( const Allocator& a );  // (2)
match_results( const match_results& rhs );  // (3)
match_results( const match_results& rhs, const Allocator& a );  // (4)
match_results( match_results&& rhs ) noexcept;  // (5)
match_results( match_results&& rhs, const Allocator& a );  // (6)
```

1,2) Constrói um resultado de correspondência sem estado de resultado estabelecido.

1) O construtor padrão.

2) Constrói o resultado de correspondência usando uma cópia de `a` como o alocador.

Quando a construção é finalizada, [`ready()`](<#/doc/regex/match_results/ready>) retorna `false` e [`size()`](<#/doc/regex/match_results/size>) retorna `0`.

3-6) Constrói um resultado de correspondência a partir de `rhs`.

3) O construtor de cópia.

4) Constrói o resultado de correspondência usando uma cópia de `a` como o alocador.

5) O construtor de movimento (move constructor). Quando a construção é finalizada, `rhs` está em um estado válido, mas não especificado.

6) Constrói o resultado de correspondência usando uma cópia de `a` como o alocador. Quando a construção é finalizada, `rhs` está em um estado válido, mas não especificado.

Dado o valor de `rhs` antes da construção como `m` e qualquer inteiro em `[`0`, `m.size()`)` como `n`, quando a construção é finalizada, as seguintes funções membro devem retornar os valores especificados: Função membro | Valor
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

- **a** — alocador a ser usado para todas as alocações de memória deste container
- **rhs** — outro `match_results` a ser usado como fonte para inicializar o `match_results`

### Exceções

1-4) Pode lançar exceções definidas pela implementação.

6) Não lança nada se `a == rhs.get_allocator()` for verdadeiro.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2191](<https://cplusplus.github.io/LWG/issue2191>) | C++11 | `n` poderia ser negativo nas pós-condições das sobrecargas (3-6) | só pode ser não-negativo
[LWG 2195](<https://cplusplus.github.io/LWG/issue2195>) | C++11 | os construtores exigidos por [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>) estavam faltando | adicionados
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | construtor padrão era explícito | tornado implícito
# std::basic_stacktrace&lt;Allocator&gt;::current

```cpp
static basic_stacktrace current( const allocator_type& alloc =
allocator_type() ) noexcept;  // (1) (desde C++23)
static basic_stacktrace current( size_type skip, const allocator_type& alloc =
allocator_type() ) noexcept;  // (2) (desde C++23)
static basic_stacktrace current( size_type skip, size_type max_depth,
const allocator_type& alloc =
allocator_type() ) noexcept;  // (3) (desde C++23)
```

  
Seja s[i] (0 ≤ `_i_` < `_n_`) a (`_i_` +1)-ésima entrada de stacktrace na stacktrace da avaliação atual no thread de execução atual, onde `_n_` é a contagem das entradas de stacktrace na stacktrace.

1) Tenta criar uma `basic_stacktrace` consistindo de s[0], s[1], ..., s[n - 1].

2) Tenta criar uma `basic_stacktrace` consistindo de s[m], s[m + 1], ..., s[n - 1], onde `_m_` é `min(skip, _n_)`.

3) Tenta criar uma `basic_stacktrace` consistindo de s[m], s[m + 1], ..., s[o - 1], onde `_m_` é `min(skip, _n_)` e `_o_` é `min(skip + max_depth, _n_)`. O comportamento é indefinido se skip + max_depth < skip (ou seja, o resultado matemático de skip + max_depth estoura).

Em todos os casos, `alloc` é armazenado na `basic_stacktrace` criada e usado para alocar o armazenamento para as entradas de stacktrace.

### Parâmetros

alloc  |  \-  |  allocator a ser usado para todas as alocações de memória da `basic_stacktrace` construída  
---|---|---
skip  |  \-  |  o número de entradas de stacktrace a serem ignoradas   
max_depth  |  \-  |  a profundidade máxima das entradas de stacktrace   
  
### Valor de retorno

Se a alocação for bem-sucedida, a `basic_stacktrace` descrita acima.

Caso contrário, uma `basic_stacktrace` vazia.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ (constructor)](<#/doc/utility/basic_stacktrace/basic_stacktrace>) |  cria uma nova `basic_stacktrace`   
(função membro pública)  
[ current](<#/doc/utility/source_location/current>)[static] |  constrói uma nova `source_location` correspondente à localização do local da chamada   
(função membro estática pública de `std::source_location`)
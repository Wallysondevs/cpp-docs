# std::student_t_distribution&lt;RealType&gt;::student_t_distribution

```cpp
student_t_distribution() : student_t_distribution(1) {}  // (1) (desde C++11)
explicit student_t_distribution( RealType n );  // (2) (desde C++11)
explicit student_t_distribution( const param_type& params );  // (3) (desde C++11)
```

Constrói um novo objeto de distribuição.

2) Usa n como o parâmetro de distribuição.

3) Usa params como o parâmetro de distribuição.

### Parâmetros

- **n** — o parâmetro de distribuição _n_ (graus de liberdade)
- **params** — o conjunto de parâmetros de distribuição

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | construtor padrão era explícito | tornado implícito
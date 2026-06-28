# std::gamma_distribution&lt;RealType&gt;::param

```cpp
param_type param() const;  // (1) (desde C++11)
void param( const param_type& params );  // (2) (desde C++11)
```

Gerencia o conjunto de parâmetros de distribuição associado.

1) Retorna o conjunto de parâmetros associado.

2) Define o conjunto de parâmetros associado para params.

### Parâmetros

- **params** — novo conteúdo do conjunto de parâmetros associado

### Valor de retorno

1) O conjunto de parâmetros associado.

2) (nenhum)

### Complexidade

Constante.
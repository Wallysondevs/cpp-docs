# std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::max_load_factor

```cpp
float max_load_factor() const;  // (1) (desde C++11)
void max_load_factor( float ml );  // (2) (desde C++11)
```

Gerencia o fator de carga máximo (número de elementos por bucket). O container aumenta automaticamente o número de buckets se o fator de carga exceder este limite.

1) Retorna o fator de carga máximo atual.

2) Define o fator de carga máximo para ml.

### Parâmetros

- **ml** — nova configuração do fator de carga máximo

### Valor de retorno

1) Fator de carga máximo atual.

2) (nenhum)

### Complexidade

Constante.

### Veja também

[ load_factor](<#/doc/container/unordered_set/load_factor>) | retorna o número médio de elementos por bucket
(função membro pública)
# std::discard_block_engine&lt;Engine,P,R&gt;::max

```cpp
static constexpr result_type max();  // (desde C++11)
```

Retorna o valor máximo potencialmente gerado pelo adaptador de engine. Este valor é igual a `e.max()` onde `e` é o engine subjacente.

### Parâmetros

(nenhum)

### Valor de retorno

O valor máximo potencialmente gerado.

### Complexidade

Constante.

### Veja também

[ min](<#/doc/numeric/random/discard_block_engine/min>)[static] | obtém o menor valor possível no intervalo de saída
(função membro estática pública)
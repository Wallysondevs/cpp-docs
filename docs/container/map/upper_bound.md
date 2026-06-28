# std::map&lt;Key,T,Compare,Allocator&gt;::upper_bound

```cpp
iterator upper_bound( const Key& key );  // (1)
const_iterator upper_bound( const Key& key ) const;  // (2)
template< class K >
iterator upper_bound( const K& x );  // (3) (desde C++14)
template< class K >
const_iterator upper_bound( const K& x ) const;  // (4) (desde C++14)
```

1,2) Retorna um iterator apontando para o primeiro elemento que é _maior_ que key.

3,4) Retorna um iterator apontando para o primeiro elemento que se compara como _maior_ que o valor x. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

- **key** — valor da key para comparar os elementos
- **x** — valor alternativo que pode ser comparado a `Key`

### Valor de retorno

Iterator apontando para o primeiro elemento que é _maior_ que key. Se nenhum elemento for encontrado, um iterator past-the-end (veja [end()](<#/doc/container/map/end>)) é retornado.

### Complexidade

Logarítmica no tamanho do container.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_generic_associative_lookup`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Busca de comparação heterogênea em [containers associativos](<#/doc/container>), para sobrecargas ([3,4](<#/doc/container/map/upper_bound>))

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ equal_range](<#/doc/container/map/equal_range>) | retorna um range de elementos que correspondem a uma key específica
(função membro pública)
[ lower_bound](<#/doc/container/map/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que a key fornecida
(função membro pública)
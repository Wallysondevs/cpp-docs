# std::multiset&lt;Key,Compare,Allocator&gt;::upper_bound

```cpp
iterator upper_bound( const Key& key );  // (1)
const_iterator upper_bound( const Key& key ) const;  // (2)
template< class K >
iterator upper_bound( const K& x );  // (3) (desde C++14)
template< class K >
const_iterator upper_bound( const K& x ) const;  // (4) (desde C++14)
```

  
1,2) Retorna um iterator apontando para o primeiro elemento que é _maior_ que key.

3,4) Retorna um iterator apontando para o primeiro elemento que se compara como _maior_ que o valor x. Esta sobrecarga participa da resolução de sobrecarga somente se o qualified-id Compare::is_transparent for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

key  |  \-  |  valor da chave para comparar os elementos   
---|---|---
x  |  \-  |  valor alternativo que pode ser comparado a `Key`  
  
### Valor de retorno

Iterator apontando para o primeiro elemento que é _maior_ que key. Se nenhum elemento assim for encontrado, um iterator past-the-end (veja [end()](<#/doc/container/multiset/end>)) é retornado. 

### Complexidade

Logarítmica no tamanho do container. 

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_generic_associative_lookup`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Busca de comparação heterogênea em [associative containers](<#/doc/container>), para sobrecargas ([3,4](<#/doc/container/multiset/upper_bound>))  
  
### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ equal_range](<#/doc/container/multiset/equal_range>) |  retorna um intervalo de elementos que correspondem a uma chave específica   
(função membro pública)  
[ lower_bound](<#/doc/container/multiset/lower_bound>) |  retorna um iterator para o primeiro elemento _não menor_ que a chave fornecida   
(função membro pública)
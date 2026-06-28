# std::map&lt;Key,T,Compare,Allocator&gt;::lower_bound

```cpp
iterator lower_bound( const Key& key );  // (1)
const_iterator lower_bound( const Key& key ) const;  // (2)
template< class K >
iterator lower_bound( const K& x );  // (3) (desde C++14)
template< class K >
const_iterator lower_bound( const K& x ) const;  // (4) (desde C++14)
```

  
1,2) Retorna um iterator apontando para o primeiro elemento que não é _menor_ que (ou seja, maior ou igual a) key.

3,4) Retorna um iterator apontando para o primeiro elemento que se compara como _não menor_ (ou seja, maior ou igual) ao valor x. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

key  |  \-  |  valor da key para comparar os elementos   
---|---|---
x  |  \-  |  valor alternativo que pode ser comparado a `Key`  
  
### Valor de retorno

Iterator apontando para o primeiro elemento que não é _menor_ que key. Se nenhum elemento for encontrado, um iterator past-the-end (veja [end()](<#/doc/container/map/end>)) é retornado. 

### Complexidade

Logarítmica no tamanho do container. 

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_generic_associative_lookup`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Pesquisa de comparação heterogênea em [containers associativos](<#/doc/container>); sobrecargas ([3,4](<#/doc/container/map/lower_bound>))  
  
### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ equal_range](<#/doc/container/map/equal_range>) |  retorna um range de elementos que correspondem a uma key específica   
(função membro pública)  
[ upper_bound](<#/doc/container/map/upper_bound>) |  retorna um iterator para o primeiro elemento _maior_ que a key fornecida   
(função membro pública)
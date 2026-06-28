# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::lower_bound

```cpp
iterator lower_bound( const Key& key );  // (1) (desde C++23)
const_iterator lower_bound( const Key& key ) const;  // (2) (desde C++23)
template< class K >
iterator lower_bound( const K& x );  // (3) (desde C++23)
template< class K >
const_iterator lower_bound( const K& x ) const;  // (4) (desde C++23)
```

  
1,2) Retorna um iterator apontando para o primeiro elemento que _não é menor_ que (isto é, maior ou igual a) `key`.

3,4) Retorna um iterator apontando para o primeiro elemento que compara como _não menor_ (isto é, maior ou igual) ao valor `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

key  |  \-  |  valor da chave para comparar os elementos   
---|---|---
x  |  \-  |  valor alternativo que pode ser comparado a `Key`  
  
### Valor de retorno

Iterator apontando para o primeiro elemento que não é _menor_ que `key`. Se nenhum elemento for encontrado, um iterator past-the-end (veja `end()`) é retornado. 

### Complexidade

Logarítmica no tamanho do container. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ equal_range](<#/doc/container/flat_multiset/equal_range>) |  retorna um range de elementos que correspondem a uma chave específica   
(função membro pública)  
[ upper_bound](<#/doc/container/flat_multiset/upper_bound>) |  retorna um iterator para o primeiro elemento _maior_ que a chave fornecida   
(função membro pública)
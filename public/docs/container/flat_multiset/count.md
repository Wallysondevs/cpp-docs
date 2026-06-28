# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::count

```cpp
size_type count( const Key& key ) const;  // (1) (desde C++23)
template< class K >
size_type count( const K& x ) const;  // (2) (desde C++23)
```

  
Retorna o número de elementos com chave que se compara _equivalente_ ao argumento especificado.

1) Retorna o número de elementos com a chave `key`.

2) Retorna o número de elementos com chave que se compara equivalente ao valor `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

key  |  \-  |  valor da chave dos elementos a serem contados   
---|---|---
x  |  \-  |  valor alternativo para comparar com as chaves   
  
### Valor de retorno

Número de elementos com chave que se compara _equivalente_ a `key` ou `x`.

### Complexidade

Logarítmica no tamanho do container mais linear no número de elementos encontrados.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ find](<#/doc/container/flat_multiset/find>) | encontra elemento com chave específica   
(função membro pública)  
[ equal_range](<#/doc/container/flat_multiset/equal_range>) | retorna um range de elementos que correspondem a uma chave específica   
(função membro pública)
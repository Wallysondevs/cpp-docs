# std::flat_set&lt;Key,Compare,KeyContainer&gt;::lower_bound

```cpp
iterator lower_bound( const Key& key );  // (1) (desde C++23)
const_iterator lower_bound( const Key& key ) const;  // (2) (desde C++23)
template< class K >
iterator lower_bound( const K& x );  // (3) (desde C++23)
template< class K >
const_iterator lower_bound( const K& x ) const;  // (4) (desde C++23)
```

1,2) Retorna um iterator apontando para o primeiro elemento que *não é menor* que (isto é, maior ou igual a) `key`.

3,4) Retorna um iterator apontando para o primeiro elemento que compara *não menor* (isto é, maior ou igual) que o valor `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parameters

- **key** — valor da chave para comparar os elementos
- **x** — valor alternativo que pode ser comparado a `Key`

### Return value

Iterator apontando para o primeiro elemento que não é *menor* que `key`. Se nenhum elemento for encontrado, um iterator past-the-end (veja `end()`) é retornado.

### Complexity

Logarítmica no tamanho do container.

### Example

| Esta seção está incompleta
Razão: sem exemplo

### See also

[ equal_range](<#/doc/container/flat_set/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(public member function)
[ upper_bound](<#/doc/container/flat_set/upper_bound>) | retorna um iterator para o primeiro elemento *maior* que a chave fornecida
(public member function)
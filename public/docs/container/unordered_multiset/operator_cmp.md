# operator==,!=(std::unordered_multiset)

```cpp
template< class Key, class Hash, class KeyEqual, class Alloc >
bool operator==( const std::unordered_multiset<Key, Hash, KeyEqual, Alloc>& lhs,
const std::unordered_multiset<Key, Hash, KeyEqual, Alloc>& rhs );  // (1)
template< class Key, class Hash, class KeyEqual, class Alloc >
bool operator!=( const std::unordered_multiset<Key, Hash, KeyEqual, Alloc>& lhs,
const std::unordered_multiset<Key, Hash, KeyEqual, Alloc>& rhs );  // (2) (até C++20)
```

  
Compara o conteúdo de dois containers não ordenados.

O conteúdo de dois containers não ordenados lhs e rhs é igual se as seguintes condições forem verdadeiras:

  * lhs.size() == rhs.size().
  * cada grupo de elementos equivalentes `[`lhs_eq1`, `lhs_eq2`)` obtido de lhs.equal_range(lhs_eq1) tem um grupo correspondente de elementos equivalentes no outro container `[`rhs_eq1`, `rhs_eq2`)` obtido de rhs.equal_range(rhs_eq1), que possui as seguintes propriedades:

    

  * [std::distance](<#/doc/iterator/distance>)(lhs_eq1, lhs_eq2) == [std::distance](<#/doc/iterator/distance>)(rhs_eq1, rhs_eq2).
  * [std::is_permutation](<#/doc/algorithm/is_permutation>)(lhs_eq1, lhs_eq2, rhs_eq1) == true.

O comportamento é indefinido se `Key` não for [EqualityComparable](<#/doc/named_req/EqualityComparable>).

O comportamento também é indefinido se `hash_function()` e `key_eq()` não tiverem (até C++20)`key_eq()` não tiver (desde C++20) o mesmo comportamento em lhs e rhs ou se operator== para `Key` não for um refinamento da partição em grupos de chaves equivalentes introduzida por `key_eq()` (isto é, se dois elementos que se comparam como iguais usando operator== caírem em partições diferentes).

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```
  
### Parâmetros

lhs, rhs  |  \-  |  containers não ordenados para comparar   
  
### Valor de retorno

1) true se o conteúdo dos containers for igual, false caso contrário.

2) true se o conteúdo dos containers não for igual, false caso contrário.

### Complexidade

Proporcional a _ΣS i2_ chamadas a operator== em `value_type`, chamadas ao predicado retornado por [`key_eq`](<#/doc/container/unordered_multiset/key_eq>), e chamadas ao hasher retornado por [`hash_function`](<#/doc/container/unordered_multiset/hash_function>) no caso médio, onde _S_ é o tamanho do _i_-ésimo grupo de chaves equivalentes. Proporcional a _N 2_ no pior caso, onde _N_ é o tamanho do container. O caso médio torna-se proporcional a _N_ se os elementos dentro de cada grupo de chaves equivalentes estiverem organizados na mesma ordem (ocorre quando os containers são cópias um do outro). 
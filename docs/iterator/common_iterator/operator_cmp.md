# operator==(std::common_iterator)

```cpp
template <class I2, std::sentinel_for<I> S2>
requires std::sentinel_for<S, I2>
friend constexpr bool operator==( const common_iterator& x,
const std::common_iterator<I2, S2>& y );  // (1) (desde C++20)
template <class I2, std::sentinel_for<I> S2>
requires std::sentinel_for<S, I2> && std::equality_comparable_with<I, I2>
friend constexpr bool operator==( const common_iterator& x,
const std::common_iterator<I2, S2>& y );  // (2) (desde C++20)
```

  
Compara os iterators e/ou sentinels mantidos pelos objetos membro [std::variant](<#/doc/utility/variant>) subjacentes `_var_`. Dois iterators incomparáveis ou dois sentinels são considerados iguais. 

O comportamento é indefinido se x ou y estiver em um estado inválido, ou seja, x.var.valueless_by_exception() || y.var.valueless_by_exception() for igual a true. 

Seja `i` x.var.index() e `j` y.var.index(). 

1) Se i == j (ou seja, ambos x e y contêm iterators ou ambos contêm sentinels), retorna true, caso contrário, retorna std::get<i>(x.var) == std::get&lt;j&gt;(y.var).

2) Se i == 1 && j == 1 (ou seja, ambos x e y contêm sentinels), retorna true, caso contrário, retorna std::get<i>(x.var) == std::get&lt;j&gt;(y.var).

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

Esses function templates não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só podem ser encontrados por [argument-dependent lookup](<#/doc/language/adl>) quando std::common_iterator&lt;I&gt; é uma classe associada dos argumentos. 

### Parâmetros

x, y  |  \-  |  adaptadores de iterator para comparar   
  
### Valor de retorno

true se os iterators e/ou sentinels subjacentes forem iguais. 

### Exemplo

Run this code
```cpp
    #include <cassert>
    #include <iterator>
    
    int main()
    {
        int a[]{0, 1, 2, 3};
    
        using CI = std::common_iterator<
                       std::counted_iterator<int*>,
                       std::default_sentinel_t
                       >;
    
        CI i1{std::counted_iterator{a + 0, 2}};
        CI i2{std::counted_iterator{a + 1, 2}};
        CI i3{std::counted_iterator{a + 0, 3}};
        CI i4{std::counted_iterator{a + 0, 0}};
        CI s1{std::default_sentinel};
        CI s2{std::default_sentinel};
    
        assert((i1 == i2) == true);
        assert((i1 == i3) == false);
        assert((i2 == i3) == false);
        assert((s1 == s2) == true);
        assert((i1 == s1) == false);
        assert((i4 == s1) == true);
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3574](<https://cplusplus.github.io/LWG/issue3574>) | C++20  | `variant` era totalmente constexpr (P2231R1) mas `common_iterator` não era  | também tornado constexpr   
  
### Veja também

[ operator-](<#/doc/iterator/common_iterator/operator->)(C++20) |  calcula a distância entre dois adaptadores de iterator   
(function template)  
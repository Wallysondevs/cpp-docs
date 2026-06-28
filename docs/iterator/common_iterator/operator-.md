# operator-(std::common_iterator)

```cpp
template< std::sized_sentinel_for<I> I2, std::sized_sentinel_for<I> S2 >
requires std::sized_sentinel_for<S, I2>
friend constexpr std::iter_difference_t<I2>
operator-( const common_iterator& x, const std::common_iterator<I2, S2>& y );  // (desde C++20)
```

  
Calcula a distância entre dois adaptadores de iterador. Duas sentinelas são consideradas iguais.

Seja `_var_` o objeto membro [std::variant](<#/doc/utility/variant>) subjacente em [std::common_iterator](<#/doc/iterator/common_iterator>), o comportamento é indefinido se x ou y for inválido, ou seja, se x.var.valueless_by_exception() || y.var.valueless_by_exception() for verdadeiro.

Este template de função não é visível para lookup não qualificado ou qualificado comum, e só pode ser encontrado por argument-dependent lookup quando std::common_iterator&lt;I&gt; é uma classe associada dos argumentos.

### Parâmetros

x, y  |  \-  |  adaptadores de iterador para calcular a diferença   
  
### Valor de retorno

  * ​0​ se x.var contiver um objeto `S` e y.var contiver um objeto `S2`, ou seja, se ambos contiverem uma sentinela.
  * Caso contrário, alt_x - alt_y, onde `alt_x` e `alt_y` são as alternativas contidas por x.var e y.var, respectivamente (ou dois iteradores ou um iterador e uma sentinela).

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
     
    int main()
    {
        int a[]{0, 1, 2, 3, 4, 5};
     
        using CI = std::common_iterator<
                       std::counted_iterator<int*>,
                       std::default_sentinel_t
                       >;
     
        CI i1{std::counted_iterator{a + 1, 2}};
        CI i2{std::counted_iterator{a, 3}};
        CI s1{std::default_sentinel};
        CI s2{std::default_sentinel};
     
        std::cout << (s2 - s1) << ' '
                  << (i2 - i1) << ' '
                  << (i1 - s1) << '\n';
    }
```

Saída:
```
    0 -1 -2
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3574](<https://cplusplus.github.io/LWG/issue3574>) | C++20  | `variant` era totalmente constexpr (P2231R1) mas `common_iterator` não era  | também foi tornado constexpr   
  
### Veja também

[ operator++operator++(int)](<#/doc/iterator/common_iterator/operator_arith>)(C++20) |  avança o adaptador de iterador   
(função membro pública)  
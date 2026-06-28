# std::experimental::simd&lt;T,Abi&gt;::operator==,!=,&lt;,&lt;=,&gt;,&gt;=

friend simd_mask operator==( const simd& lhs, const simd& rhs ) noexcept; |  (1)  |  (parallelism TS v2)  
---|---|---
friend simd_mask operator!=( const simd& lhs, const simd& rhs ) noexcept; |  (2)  |  (parallelism TS v2)  
friend simd_mask operator<( const simd& lhs, const simd& rhs ) noexcept; |  (3)  |  (parallelism TS v2)  
friend simd_mask operator<=( const simd& lhs, const simd& rhs ) noexcept; |  (4)  |  (parallelism TS v2)  
friend simd_mask operator>( const simd& lhs, const simd& rhs ) noexcept; |  (5)  |  (parallelism TS v2)  
friend simd_mask operator>=( const simd& lhs, const simd& rhs ) noexcept; |  (6)  |  (parallelism TS v2)  

  
Aplica a comparação fornecida elemento a elemento a cada elemento correspondente dos operandos. Retorna um [`simd_mask`](<#/doc/experimental/simd/simd_mask>) de tal forma que para todo i no intervalo de `[`​0​`, `[`size()`](<#/doc/experimental/simd/simd/size>)`)` o i-ésimo elemento é igual a: 

1) lhs[i] == rhs[i].

2) lhs[i] != rhs[i].

3) lhs[i] < rhs[i].

4) lhs[i] <= rhs[i].

5) lhs[i] > rhs[i].

6) lhs[i] >= rhs[i].

### Parâmetros

lhs  |  \-  |  operandos da esquerda   
---|---|---
rhs  |  \-  |  operandos da direita   
  
### Exemplo

Execute este código
```
    #include <cassert>
    #include <iostream>
    #include <initializer_list>
    #include <iterator>
     
    #include <experimental/simd>
    namespace stdx = std::experimental;
     
    int main()
    {
        using V = stdx::fixed_size_simd<int, 4>;
        using M = stdx::fixed_size_simd_mask<int, 4>;
     
        auto assert_equivalence = <int>&& y)
        {
            for (decltype(M::size()) i{}; i != M::size(); ++i)
                assert(x[i] == std::cbegin(y)[i]);
        };
     
        V a{2}, b, c{3};
        b[0] = 1, b[1] = 2, b[2] = 3, b[3] = 4;
     
        // a == {2, 2, 2, 2}
        // b == {1, 2, 3, 4}
        // c == {3, 3, 3, 3}
     
        assert_equivalence(a == a, {1, 1, 1, 1});
        assert_equivalence(a == b, {0, 1, 0, 0});
        assert_equivalence(b == c, {0, 0, 1, 0});
        assert_equivalence(a == c, {0, 0, 0, 0});
     
        assert_equivalence(a != a, {0, 0, 0, 0});
        assert_equivalence(a != b, {1, 0, 1, 1});
        assert_equivalence(b != c, {1, 1, 0, 1});
        assert_equivalence(a != c, {1, 1, 1, 1});
     
        assert_equivalence(a < a, {0, 0, 0, 0});
        assert_equivalence(a < b, {0, 0, 1, 1});
        assert_equivalence(b < c, {1, 1, 0, 0});
        assert_equivalence(a < c, {1, 1, 1, 1});
    }
```

### Veja também

[ all_ofany_ofnone_ofsome_of](<#/doc/experimental/simd/all_of>)(parallelism TS v2) |  reduções de [`simd_mask`](<#/doc/experimental/simd/simd_mask>) para bool   
(modelo de função)  
[ popcount](<#/doc/experimental/simd/popcount>)(parallelism TS v2) |  redução de [`simd_mask`](<#/doc/experimental/simd/simd_mask>) para o número de valores verdadeiros   
(modelo de função)  
[ find_first_setfind_last_set](<#/doc/experimental/simd/find_first_set>)(parallelism TS v2) |  reduções de [`simd_mask`](<#/doc/experimental/simd/simd_mask>) para o índice do primeiro ou último valor verdadeiro   
(modelo de função)  
[ simd_mask](<#/doc/experimental/simd/simd_mask>)(parallelism TS v2) |  tipo de dados paralelo com o tipo de elemento bool   
(modelo de classe)
# std::experimental::reduce, std::experimental::hmin, std::experimental::hmax

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T, class Abi, class BinaryOperation = std::plus<> >
T reduce( const simd<T, Abi>& v, BinaryOperation binary_op = {} );
template< class M, class V, class BinaryOperation >
typename V::value_type
reduce( const const_where_expression<M, V>& x,
typename V::value_type identity_element, BinaryOperation binary_op = {} );
template< class M, class V >
typename V::value_type
reduce( const const_where_expression<M, V>& x, std::plus<> binary_op ) noexcept;
template< class M, class V >
typename V::value_type
reduce( const const_where_expression<M, V>& x, std::multiplies<> binary_op ) noexcept;
template< class M, class V >
typename V::value_type
reduce( const const_where_expression<M, V>& x, std::bit_and<> binary_op ) noexcept;
template< class M, class V >
typename V::value_type
reduce( const const_where_expression<M, V>& x, std::bit_or<> binary_op ) noexcept;
template< class M, class V >
typename V::value_type
reduce( const const_where_expression<M, V>& x, std::bit_xor<> binary_op ) noexcept;
template< class T, class Abi >
T hmin( const simd<T, Abi>& v ) noexcept;
template< class M, class V >
typename V::value_type
hmin( const const_where_expression<M, V>& x ) noexcept;
template< class T, class Abi >
T hmax( const simd<T, Abi>& v ) noexcept;
template< class M, class V >
typename V::value_type
hmax( const const_where_expression<M, V>& x ) noexcept;
```

1) Reduz todos os valores em `v` usando `binary_op`.
2) Reduz os valores em `x` onde o elemento de máscara associado é verdadeiro usando `binary_op`.
3) Retorna a soma de todos os valores em `x` onde o elemento de máscara associado é verdadeiro.
4) Retorna o produto de todos os valores em `x` onde o elemento de máscara associado é verdadeiro.
5) Retorna a agregação usando bitwise-and de todos os valores em `x` onde o elemento de máscara associado é verdadeiro.
6) Retorna a agregação usando bitwise-or de todos os valores em `x` onde o elemento de máscara associado é verdadeiro.
7) Retorna a agregação usando bitwise-xor de todos os valores em `x` onde o elemento de máscara associado é verdadeiro.
8) Reduz todos os valores em `v` usando [std::min](<#/doc/algorithm/min>).
9) Reduz todos os valores em `x` onde o elemento de máscara associado é verdadeiro usando [std::min](<#/doc/algorithm/min>).
10) Reduz todos os valores em `v` usando [std::max](<#/doc/algorithm/max>).
11) Reduz todos os valores em `x` onde o elemento de máscara associado é verdadeiro usando [std::max](<#/doc/algorithm/max>).

O comportamento é não-determinístico se `binary_op` não for associativa ou não comutativa.

### Parâmetros

- **v** — o vetor [`simd`](<#/doc/experimental/simd/simd>) ao qual aplicar a redução
- **x** — o valor de retorno de uma expressão [`where`](<#/doc/experimental/simd/where>) ao qual aplicar a redução
- **identity_element** — um valor que atua como elemento de identidade para `binary_op`; `binary_op(identity_element, a) == a` deve ser verdadeiro para todos os `a` finitos do tipo `V::value_type`
- **binary_op** — um [FunctionObject](<#/doc/named_req/FunctionObject>) binário que será aplicado em ordem não especificada a argumentos do tipo `V::value_type` ou `simd<V::value_type, A>`, com tag ABI `A` não especificada. `binary_op(v, v)` deve ser conversível para `V`

### Valor de retorno

O resultado da operação do tipo:

1,8,10) `T`

2-7,9,11) `V::value_type`

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <cassert>
    #include <cstddef>
    #include <experimental/simd>
    #include <functional>
    #include <iostream>
    #include <numeric>
    namespace stdx = std::experimental;
    
    int main()
    {
        using V = stdx::native_simd<double>;
    
        alignas(stdx::memory_alignment_v<V>) std::array<V::value_type, 1024> data;
        std::iota(data.begin(), data.end(), 0);
    
        V::value_type acc{};
        for (std::size_t i = 0; i < data.size(); i += V::size())
            acc += stdx::reduce(V(&data[i], stdx::vector_aligned), std::plus{});
        std::cout << "sum of data = " << acc << '\n';
    
        using W = stdx::fixed_size_simd<int, 4>;
        alignas(stdx::memory_alignment_v<W>) std::array<int, 4> arr{2, 5, 4, 1};
        auto w = W(&arr[0], stdx::vector_aligned);
        assert(stdx::hmin(w) == 1 and stdx::hmax(w) == 5);
    }
```

Saída:
```
    sum of data = 523776
```

### Ver também

[ reduce](<#/doc/algorithm/reduce>)(C++17) | similar a [std::accumulate](<#/doc/algorithm/accumulate>), exceto pela ordem
(modelo de função)
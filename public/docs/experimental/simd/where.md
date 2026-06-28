# std::experimental::where

Definido no header `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```cpp
template< class T, class Abi >
where_expression<simd_mask<T, Abi>, simd<T, Abi>>
where( const typename simd<T, Abi>::mask_type& mask,
simd<T, Abi>& value ) noexcept;  // (1)
template< class T, class Abi >
const_where_expression<simd_mask<T, Abi>, const simd<T, Abi>>
where( const typename simd<T, Abi>::mask_type& mask,
const simd<T, Abi>& value ) noexcept;  // (2)
template< class T, class Abi >
where_expression<simd_mask<T, Abi>, simd_mask<T, Abi>>
where( const type_identity_t<simd_mask<T, Abi>>& mask,
simd_mask<T, Abi>& value ) noexcept;  // (3)
template< class T, class Abi >
const_where_expression<simd_mask<T, Abi>, const simd_mask<T, Abi>>
where( const type_identity_t<simd_mask<T, Abi>>& mask,
const simd_mask<T, Abi>& value ) noexcept;  // (4)
template< class T >
where_expression<bool, T>
where( /*veja abaixo*/ mask, T& value ) noexcept;  // (5)
template< class T >
const_where_expression<bool, const T>
where( /*veja abaixo*/ mask, const T& value ) noexcept;  // (6)
```

  
Constrói uma nova [`const_where_expression`](<#/doc/experimental/simd/const_where_expression>) ou [`where_expression`](<#/doc/experimental/simd/where_expression>). 

1-6) Constrói uma _where_expression_ a partir dos parâmetros mask e value fornecidos.

### Parâmetros

1-4) mask  |  \-  |  o objeto [`simd_mask`](<#/doc/experimental/simd/simd_mask>)   
---|---|---
value  |  \-  |  referência para o objeto [`simd`](<#/doc/experimental/simd/simd>) ao qual a mask se aplica   
  
5,6) mask  |  \-  |  a mask do tipo bool  
---|---|---
value  |  \-  |  referência para o escalar ao qual a mask se aplica   
  
### Valor de retorno

A [`const_where_expression`](<#/doc/experimental/simd/const_where_expression>) ou [`where_expression`](<#/doc/experimental/simd/where_expression>) construída. 

### Notas

5,6) Usa um tipo de mask definido pela implementação, de modo que conversões implícitas de outros tipos para bool sejam desabilitadas.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
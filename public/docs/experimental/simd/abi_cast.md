# std::experimental::to_fixed_size, std::experimental::to_native, std::experimental::to_compatible

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T, class Abi >
fixed_size_simd<T, simd_size_v<T, Abi>>
to_fixed_size( const simd<T, Abi>& v ) noexcept;
template< class T, class Abi >
fixed_size_simd_mask<T, simd_size_v<T, Abi>>
to_fixed_size( const simd_mask<T, Abi>& v ) noexcept;
template< class T, std::size_t N >
native_simd<T>
to_native( const fixed_size_simd<T, N>& v ) noexcept;
template< class T, std::size_t N >
native_simd_mask<T>
to_native( const fixed_size_simd_mask<T, N>>& v ) noexcept;
template< class T, std::size_t N >
simd<T>
to_compatible( const fixed_size_simd<T, N>& v ) noexcept;
template< class T, std::size_t N >
simd_mask<T>
to_compatible( const fixed_size_simd_mask<T, N>& v ) noexcept;
```

Retorna um objeto simd ou simd_mask com os mesmos elementos, mas uma ABI diferente.

3-6) Estas funções não participam da resolução de sobrecarga a menos que N seja o mesmo que o tamanho do tipo de retorno.

### Parâmetros

- **v** — o objeto simd ou simd_mask de entrada

### Valor de retorno

O objeto simd ou simd_mask com a ABI especificada.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo
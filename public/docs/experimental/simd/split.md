# std::experimental::split, split_by

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< std::size_t... Sizes, class T, class Abi >
std::tuple<simd<T, simd_abi::deduce_t<T, Sizes>>...>
split( const simd<T, Abi>& v ) noexcept;
template< std::size_t... Sizes, class T, class Abi >
std::tuple<simd_mask<T, simd_abi::deduce_t<T, Sizes>>...>
split( const simd_mask<T, Abi>& v ) noexcept;
template< class V, class Abi >
std::array<V, simd_size_v<typename V::value_type, Abi> / V::size()>
split( const simd<typename V::value_type, Abi>& v ) noexcept;
template< class V, class Abi >
std::array<V, simd_size_v<typename V::value_type, Abi> / V::size()>
split( const simd_mask<typename V::value_type, Abi>& v ) noexcept;
template< size_t N, class T, class A >
array<resize_simd<simd_size_v<T, A> / N, simd<T, A>>, N>
split_by( const simd<T, A>& v ) noexcept;
template< size_t N, class T, class A >
array<resize_simd<simd_size_v<T, A> / N, simd_mask<T, A>>, N>
split_by( const simd_mask<T, A>& v ) noexcept;
```

Divide o objeto de entrada `simd` ou `simd_mask` em múltiplos objetos `simd` ou `simd_mask`.

1,2) Dividem o objeto de entrada em tipos de objetos potencialmente diferentes (por exemplo, tipos com tamanhos diferentes). Essas funções não participam da resolução de sobrecarga a menos que Sizes... somem v.size().

3,4) Dividem o objeto de entrada em um array de objetos. Essas funções não participam da resolução de sobrecarga a menos que

  * O elemento do array deve ser do tipo `simd` ou `simd_mask`, para o tipo de v como `simd` ou `simd_mask`, respectivamente.
  * simd_size_v&lt;typename V::value_type, Abi&gt; é um múltiplo inteiro de V::size().

5,6) Dividem o objeto de entrada em um array de objetos. Essas funções não devem participar da resolução de sobrecarga a menos que simd_size_v<T, A> seja um múltiplo inteiro de `N`.

### Parâmetros

- **v** — o objeto de entrada `simd` ou `simd_mask`

### Valor de retorno

1,2) Uma tupla que contém os objetos `simd` ou `simd_mask` divididos.

3-6) Um array que contém os objetos `simd` ou `simd_mask` divididos.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo
# std::experimental::simd_cast, std::experimental::static_simd_cast

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class V, class T, class Abi >
/*veja abaixo*/ simd_cast( const simd<T, Abi>& v ) noexcept;
template< class V, class T, class Abi >
/*veja abaixo*/ static_simd_cast( const simd<T, Abi>& v ) noexcept;
```

Converte um objeto simd para outro objeto simd. Se V for T, retorna simd<T, Abi>; caso contrário, se V for um tipo escalar, retorna simd<V, simd_abi::fixed_size<simd<T, Abi>::size()>>. Caso contrário, V deve ser um tipo simd, e a função retorna V.

1) Esta função não participa da resolução de sobrecarga a menos que
  * cada valor possível do elemento de entrada possa ser representado com o elemento de saída,
  * ou is_simd_v&lt;V&gt; seja falso, ou V::size() seja simd<T, Abi>::size().

2) Esta função não participa da resolução de sobrecarga a menos que is_simd_v&lt;V&gt; seja falso, ou V::size() seja simd<T, Abi>::size().

### Parâmetros

- **v** — o objeto simd de entrada

### Valor de retorno

Um objeto simd com o i-ésimo elemento inicializado para static_cast&lt;To&gt;(v[i]), onde To é o tipo de elemento de saída conforme especificado.

### Notas

A especificação do TS está faltando sobrecargas de simd_cast e static_simd_cast para simd_mask. A implementação do libstdc++ fornece as sobrecargas ausentes no namespace std::experimental::__proposed. Se você já usa o
```cpp
    namespace stdx = std::experimental;
```
atalho, você pode estar interessado em usar
```cpp
    namespace stdx {
      using namespace std::experimental;
      using namespace std::experimental::__proposed;
    }
```
em vez disso. Alternativamente, o libstdc++ implementa uma função membro __cvt() em simd_mask, que permite a conversão implícita da máscara. Veja também: <https://github.com/VcDevel/std-simd/issues/41>

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo
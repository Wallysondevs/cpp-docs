# Header da biblioteca padrão &lt;stdfloat&gt; (C++23)

Este header faz parte da biblioteca de [suporte a tipos](<#/doc/types>), fornecendo [tipos de ponto flutuante de largura fixa](<#/doc/types/floating-point>).

### Tipos

---
[ float16_tfloat32_tfloat64_tfloat128_t](<#/doc/types/floating-point>)(C++23)(optional) | tipo de ponto flutuante binário com largura exata de 16, 32, 64 e 128 bits, respectivamente
(typedef)
[ bfloat16_t](<#/doc/types/floating-point>)(C++23)(optional) | tipo de ponto flutuante "brain" com exatamente 16 bits
(typedef)

### Sinopse
```cpp
    namespace std {
      #if defined(__STDCPP_FLOAT16_T__)
        using float16_t  = /* implementation-defined */;
      #endif
      #if defined(__STDCPP_FLOAT32_T__)
        using float32_t  = /* implementation-defined */;
      #endif
      #if defined(__STDCPP_FLOAT64_T__)
        using float64_t  = /* implementation-defined */;
      #endif
      #if defined(__STDCPP_FLOAT128_T__)
        using float128_t = /* implementation-defined */;
      #endif
      #if defined(__STDCPP_BFLOAT16_T__)
        using bfloat16_t = /* implementation-defined */;
      #endif
    }
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

  * 17.5 Sinopse do header &lt;stdfloat&gt; [stdfloat.syn]

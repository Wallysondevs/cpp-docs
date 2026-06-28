# Cabeçalho da biblioteca padrão &lt;bit&gt; (C++20)

Este cabeçalho faz parte da biblioteca [numeric](<#/doc/numeric>).

### Tipos

---
[ endian](<#/doc/types/endian>)(C++20) | indica a ordem de bytes (endianness) de tipos escalares
(enum)

### Funções

[ bit_cast](<#/doc/numeric/bit_cast>)(C++20) | reinterpreta a representação de objeto de um tipo como a de outro
(function template)
[ byteswap](<#/doc/numeric/byteswap>)(C++23) | inverte os bytes no valor inteiro fornecido
(function template)
[ has_single_bit](<#/doc/numeric/has_single_bit>)(C++20) | verifica se um número é uma potência integral de 2
(function template)
[ bit_ceil](<#/doc/numeric/bit_ceil>)(C++20) | encontra a menor potência integral de 2 não menor que o valor fornecido
(function template)
[ bit_floor](<#/doc/numeric/bit_floor>)(C++20) | encontra a maior potência integral de 2 não maior que o valor fornecido
(function template)
[ bit_width](<#/doc/numeric/bit_width>)(C++20) | encontra o menor número de bits necessários para representar o valor fornecido
(function template)
[ rotl](<#/doc/numeric/rotl>)(C++20) | calcula o resultado da rotação bit a bit para a esquerda
(function template)
[ rotr](<#/doc/numeric/rotr>)(C++20) | calcula o resultado da rotação bit a bit para a direita
(function template)
[ countl_zero](<#/doc/numeric/countl_zero>)(C++20) | conta o número de bits 0 consecutivos, começando do bit mais significativo
(function template)
[ countl_one](<#/doc/numeric/countl_one>)(C++20) | conta o número de bits 1 consecutivos, começando do bit mais significativo
(function template)
[ countr_zero](<#/doc/numeric/countr_zero>)(C++20) | conta o número de bits 0 consecutivos, começando do bit menos significativo
(function template)
[ countr_one](<#/doc/numeric/countr_one>)(C++20) | conta o número de bits 1 consecutivos, começando do bit menos significativo
(function template)
[ popcount](<#/doc/numeric/popcount>)(C++20) | conta o número de bits 1 em um inteiro sem sinal
(function template)

### Sinopse
```cpp
    namespace std {
      // bit_cast
      template<class To, class From>
        constexpr To bit_cast(const From& from) noexcept;
    
      // byteswap
      template <class T>
        constexpr T byteswap(T value) noexcept;
    
      // integral powers of 2
      template<class T>
        constexpr bool has_single_bit(T x) noexcept;
      template<class T>
        constexpr T bit_ceil(T x);
      template<class T>
        constexpr T bit_floor(T x) noexcept;
      template<class T>
        constexpr int bit_width(T x) noexcept;
    
      // rotating
      template<class T>
        constexpr T rotl(T x, int s) noexcept;
      template<class T>
        constexpr T rotr(T x, int s) noexcept;
    
      // counting
      template<class T>
        constexpr int countl_zero(T x) noexcept;
      template<class T>
        constexpr int countl_one(T x) noexcept;
      template<class T>
        constexpr int countr_zero(T x) noexcept;
      template<class T>
        constexpr int countr_one(T x) noexcept;
      template<class T>
        constexpr int popcount(T x) noexcept;
    
      // endian
      enum class endian {
        little = /* see description */,
        big    = /* see description */,
        native = /* see description */
      };
    }
```
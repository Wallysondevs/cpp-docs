# Header da biblioteca padrão &lt;cstddef&gt;

Este header estava originalmente na biblioteca padrão C como [`<stddef.h>`](<#/>).

Este header faz parte da biblioteca de [utilidades](<#/doc/utility>).

### Macros

---
[ NULL](<#/doc/types/NULL>) | constante de ponteiro nulo definida pela implementação
(constante macro)
[ offsetof](<#/doc/types/offsetof>) | deslocamento em bytes do início de um tipo com [layout padrão](<#/doc/named_req/StandardLayoutType>) para o membro especificado
(macro de função)

### Tipos

[ size_t](<#/doc/types/size_t>) | tipo inteiro sem sinal retornado pelo operador [`sizeof`](<#/doc/language/sizeof>)
(typedef)
[ ptrdiff_t](<#/doc/types/ptrdiff_t>) | tipo inteiro com sinal retornado ao subtrair dois ponteiros
(typedef)
[ nullptr_t](<#/doc/types/nullptr_t>)(C++11) | o tipo do literal de ponteiro nulo [`nullptr`](<#/doc/language/nullptr>)
(typedef)
[ max_align_t](<#/doc/types/max_align_t>)(C++11) | tipo trivial com requisito de alinhamento tão grande quanto qualquer outro tipo escalar
(typedef)
[ byte](<#/doc/types/byte>)(C++17) | o tipo byte
(enum)

### Funções

[ to_integer](<#/doc/types/byte>)(C++17) | converte std::byte para inteiro
(modelo de função)

### Sinopse
```
    namespace std {
      using ptrdiff_t = /* see description */;
      using size_t = /* see description */;
      using max_align_t = /* see description */;
      using nullptr_t = decltype(nullptr);
    
      enum class byte : unsigned char {};
    
      // byte type operations
      template<class IntType>
        constexpr byte& operator<<=(byte& b, IntType shift) noexcept;
      template<class IntType>
        constexpr byte operator<<(byte b, IntType shift) noexcept;
      template<class IntType>
        constexpr byte& operator>>=(byte& b, IntType shift) noexcept;
      template<class IntType>
        constexpr byte operator>>(byte b, IntType shift) noexcept;
      constexpr byte& operator|=(byte& l, byte r) noexcept;
      constexpr byte operator|(byte l, byte r) noexcept;
      constexpr byte& operator&=(byte& l, byte r) noexcept;
      constexpr byte operator&(byte l, byte r) noexcept;
      constexpr byte& operator^=(byte& l, byte r) noexcept;
      constexpr byte operator^(byte l, byte r) noexcept;
      constexpr byte operator~(byte b) noexcept;
      template<class IntType>
        constexpr IntType to_integer(byte b) noexcept;
    }
    
    #define NULL /* see description */
    #define offsetof(P, D) /* see description */
```

### Notas

  * [NULL](<#/doc/types/NULL>) também é definido nos seguintes headers:
    * [`<clocale>`](<#/doc/header/clocale>)
    * [`<ctime>`](<#/doc/header/ctime>)
    * [`<cstring>`](<#/doc/header/cstring>)
    * [`<cstdio>`](<#/doc/header/cstdio>)
    * [`<cstdlib>`](<#/doc/header/cstdlib>)
    * [`<cwchar>`](<#/doc/header/cwchar>)
  * [std::size_t](<#/doc/types/size_t>) também é definido nos seguintes headers:
    * [`<ctime>`](<#/doc/header/ctime>)
    * [`<cstring>`](<#/doc/header/cstring>)
    * [`<cstdio>`](<#/doc/header/cstdio>)
    * [`<cwchar>`](<#/doc/header/cwchar>)
    * [`<cuchar>`](<#/doc/header/cuchar>) (desde C++17)

# Cabeçalho da biblioteca padrão &lt;cuchar&gt; (C++11)

Este cabeçalho estava originalmente na biblioteca padrão C como [`<uchar.h>`](<#/>).

Este cabeçalho faz parte da biblioteca de [strings multibyte terminadas em nulo](<#/doc/string/multibyte>).

### Macros

---
__STDC_UTF_16__(C++11) | indica que a codificação UTF-16 é usada por mbrtoc16 e c16rtomb
(constante de macro)
__STDC_UTF_32__(C++11) | indica que a codificação UTF-32 é usada por mbrtoc32 e c32rtomb
(constante de macro)

### Tipos

[ mbstate_t](<#/doc/string/multibyte/mbstate_t>) | informações de estado de conversão necessárias para iterar strings de caracteres multibyte
(classe)
[ size_t](<#/doc/types/size_t>) | tipo inteiro sem sinal retornado pelo operador [`sizeof`](<#/doc/language/sizeof>)
(typedef)

### Funções

[ mbrtoc16](<#/doc/string/multibyte/mbrtoc16>)(C++11) | converte um caractere multibyte estreito para codificação UTF-16
(função)
[ c16rtomb](<#/doc/string/multibyte/c16rtomb>)(C++11) | converte um caractere UTF-16 para codificação multibyte estreita
(função)
[ mbrtoc32](<#/doc/string/multibyte/mbrtoc32>)(C++11) | converte um caractere multibyte estreito para codificação UTF-32
(função)
[ c32rtomb](<#/doc/string/multibyte/c32rtomb>)(C++11) | converte um caractere UTF-32 para codificação multibyte estreita
(função)
[ mbrtoc8](<#/doc/string/multibyte/mbrtoc8>)(C++20) | converte um caractere multibyte estreito para codificação UTF-8
(função)
[ c8rtomb](<#/doc/string/multibyte/c8rtomb>)(C++20) | converte string UTF-8 para codificação multibyte estreita
(função)

### Sinopse
```cpp
    namespace std {
      using mbstate_t = /* see description */;
      using size_t = /* see description */;
    
      size_t mbrtoc8(char8_t* pc8, const char* s, size_t n, mbstate_t* ps);
      size_t c8rtomb(char* s, char8_t c8, mbstate_t* ps);
      size_t mbrtoc16(char16_t* pc16, const char* s, size_t n, mbstate_t* ps);
      size_t c16rtomb(char* s, char16_t c16, mbstate_t* ps);
      size_t mbrtoc32(char32_t* pc32, const char* s, size_t n, mbstate_t* ps);
      size_t c32rtomb(char* s, char32_t c32, mbstate_t* ps);
    }
```